import { Request, Response } from 'express';
import { User, Account, Transaction } from '../models/relationships';
import { Op } from 'sequelize';
import { isSameDay, parse } from 'date-fns';

const depositValue = async (req: Request, res: Response) => {
    const { value } = req.body;

    const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });
    const account = await Account.findByPk(userFound?.dataValues.account.dataValues.id);
    let accountBalance = Number(account?.dataValues.balance);

    const depositValue = Number(value);

    if (depositValue <= 0) {
        return res.status(400).json({ message: 'Só são permitidos valores positivos' });
    }

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

    if (withdrawValue <= 0) {
        return res.status(400).json({ message: 'Só são permitidos valores positivos' });
    }

    accountBalance -= withdrawValue;

    if (accountBalance < 0) {
        return res.status(400).json({ message: 'Saldo insuficiente' });
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
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const creditAccount = await Account.findByPk(creditUser?.dataValues.account.dataValues.id);

    if (debitAccount?.dataValues.id === creditAccount?.dataValues.id) {
        return res.status(400).json({ message: 'Conta de origem e destino são iguais' });
    }

    let creditAccountBalance = Number(creditAccount?.dataValues.balance);

    const transferValue = Number(value);

    if (transferValue <= 0) {
        return res.status(400).json({ message: 'Só são permitidos valores positivos' });
    }

    debitAccountBalance -= transferValue;

    if (debitAccountBalance < 0) {
        return res.status(400).json({ message: 'Saldo insuficiente' });
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

const getTransactions = async (req: Request, res: Response) => {
    const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });
    const transactions = await Transaction.findAll({
        where: {
            [Op.or]: [
                { debitedAccountId: userFound?.dataValues.account.dataValues.id },
                { creditedAccountId: userFound?.dataValues.account.dataValues.id }
            ]
        }
    });

    let arrayTransactions: object[] = [];
    for (let transaction of transactions) {
        arrayTransactions.push(transaction.dataValues);
    }

    return res.status(200).json({
        accountUser: userFound?.dataValues.username,
        transactions: arrayTransactions
    });
}

const filterTransactions = async (req: Request, res: Response) => {
    const { date } = req.body;

    if (!date) {
        getTransactions(req, res);
    } else {
        const filteringDate = parse(date, 'dd/MM/yyyy', new Date());

        const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });
        const transactions = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { debitedAccountId: userFound?.dataValues.account.dataValues.id },
                    { creditedAccountId: userFound?.dataValues.account.dataValues.id }
                ]
            }
        });

        let arrayTransactions: object[] = [];
        let transactionDate: Date;

        for (let transaction of transactions) {
            transactionDate = transaction.dataValues.createdAt;
            if (isSameDay(transactionDate, filteringDate)) {
                arrayTransactions.push(transaction.dataValues);
            }
        }

        return res.status(200).json({
            accountUser: userFound?.dataValues.username,
            transactions: arrayTransactions
        });
    }
}

export {
    depositValue,
    withdrawValue,
    transferValue,
    getTransactions,
    filterTransactions
}