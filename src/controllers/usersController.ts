import '../env';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Account } from '../models/relationships';
import { UserModel } from '../interfaces/UserModel';
import { AccountModel } from '../interfaces/AccountModel';
import * as Yup from 'yup';

const registerUser = async (req: Request, res: Response) => {
    const user: Omit<UserModel, 'id' | 'accountId'> = req.body;

    const mandatoryData = Yup.object().shape({
        username: Yup.string().min(3, { mensagem: 'O campo username necessita de no mínimo 3 caracteres' }).required({ mensagem: 'É necessário informar o username do usuário' }),
        password: Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, { mensagem: 'A senha precisa ter no mínimo 8 caracteres e pelo menos uma letra maiúscula e um número ' }).required({ mensagem: 'É necessário informar a senha do usuário' })
    });

    try {
        await mandatoryData.validate(user);
    } catch (error: any) {
        const yupError = error as Yup.ValidationError;
        return res.status(400).json(yupError);
    }


    const userFound = await User.findOne({ where: { username: user.username } });

    if (userFound) {
        return res.status(401).json({ mensagem: 'Já existe usuário com o username informado.' });
    }

    const account: Omit<AccountModel, 'id'> = {
        balance: 100
    }

    const accountEntered = await Account.create({
        balance: account.balance
    });

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const userEntered = await User.create({
        username: user.username,
        password: encryptedPassword,
        accountId: accountEntered.dataValues.id
    });

    const { password: _, ...userData } = userEntered.dataValues;

    return res.status(201).json(userData);
}

const login = async (req: Request, res: Response) => {
    const user: Omit<UserModel, 'id' | 'accountId'> = req.body;

    const userFound = await User.findOne({ where: { username: user.username } });

    if (!userFound) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s)' });
    }

    const passwordVerified = await bcrypt.compare(user.password, userFound.dataValues.password);

    if (!passwordVerified) {
        return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s)' });
    }

    const token = jwt.sign({ id: userFound.dataValues.id }, process.env.JWT_SECRET ?? '', { expiresIn: '24h' });

    const { password: _, ...userData } = userFound.dataValues;

    return res.status(201).json({
        user: userData,
        token
    });

}

const userBalance = async (req: Request, res: Response) => {
    const userFound = await User.findOne({ where: { username: req.user.username }, include: Account });

    const accountBalance = Number(userFound?.dataValues.account.dataValues.balance);

    return res.status(200).json({
        accountUser: userFound?.dataValues.username,
        accountBalance
    });
}

export {
    registerUser,
    login,
    userBalance
};