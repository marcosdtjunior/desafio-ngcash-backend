import { Request, Response } from 'express';
import { User, Account, Transaction } from '../models/relationships';

const depositValue = async (req: Request, res: Response) => {
    const { value } = req.body;

    const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });
    const account = await Account.findByPk(userFound?.dataValues.account.dataValues.id);
    let accountBalance = Number(account?.dataValues.balance);

    const depositValue = Number(value);
    accountBalance += depositValue;

    await account?.update({ balance: accountBalance });

    return res.status(201).json({
        accountUser: userFound?.dataValues.username,
        accountBalance
    });
}

const withdrawValue = async (req: Request, res: Response) => {
    const { value } = req.body;

    const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });
    const account = await Account.findByPk(userFound?.dataValues.account.dataValues.id);
    let accountBalance = Number(account?.dataValues.balance);

    const withdrawValue = Number(value);
    accountBalance -= withdrawValue;

    if (accountBalance < 0) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

    await account?.update({ balance: accountBalance });

    return res.status(201).json({
        accountUser: userFound?.dataValues.username,
        accountBalance
    });
}

const transferValue = async (req: Request, res: Response) => {
    const { transferUsername, value } = req.body;

    const debitUser = await User.findOne({ where: { username: req.user.username }, include: Account });
    const debitAccount = await Account.findByPk(debitUser?.dataValues.account.dataValues.id);
    let debitAccountBalance = Number(debitAccount?.dataValues.balance);

    const creditUser = await User.findOne({ where: { username: transferUsername }, include: Account });

    if (!creditUser) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const creditAccount = await Account.findByPk(creditUser?.dataValues.account.dataValues.id);

    if (debitAccount?.dataValues.id === creditAccount?.dataValues.id) {
        return res.status(400).json({ mensagem: 'Conta de origem e destino são iguais' });
    }

    let creditAccountBalance = Number(creditAccount?.dataValues.balance);

    const transferValue = Number(value);
    debitAccountBalance -= transferValue;

    if (debitAccountBalance < 0) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

    creditAccountBalance += transferValue;

    await debitAccount?.update({ balance: debitAccountBalance });
    await creditAccount?.update({ balance: creditAccountBalance });

    await Transaction.create({
        value: transferValue,
        debitedAccountId: debitUser?.dataValues.account.dataValues.id,
        creditedAccountId: creditUser?.dataValues.account.dataValues.id
    });

    return res.status(201).json({
        debitAccount: {
            username: debitUser?.dataValues.username,
            balance: debitAccountBalance
        },
        creditAccount: {
            username: creditUser?.dataValues.username,
            balance: creditAccountBalance
        }
    });
}

export {
    depositValue,
    withdrawValue,
    transferValue
}