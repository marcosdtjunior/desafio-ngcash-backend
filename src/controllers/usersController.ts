import { User, Account, Transaction } from '../models/relationships';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from '../interfaces/UserModel';
import { registerAccount } from './accountsController';

const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const accountEntered = await Account.create({
        balance: 100
    });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: encryptedPassword,
        accountId: accountEntered.dataValues.id
    });

    const { password: _, ...userData } = user.dataValues;

    return res.status(201).json(userData);
}

export {
    registerUser
};