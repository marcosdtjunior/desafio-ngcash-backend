import { Request, Response } from 'express';
import { Account } from '../models/relationships';

const registerAccount = async (req: Request, res: Response) => {
    const accountEntered = await Account.create({
        balance: 100
    });

    res.status(200).json({ mensagem: 'Conta criada com sucesso!' });
}

export {
    registerAccount
};