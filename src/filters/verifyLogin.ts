import '../env';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/relationships';

type JwtPayload = {
    id: number
}

const verifyLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        if (!token) {
            return res.status(400).json({ mensagem: 'Token não informado' });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload;

        const userFound = await User.findOne({ where: { id } });

        if (!userFound) {
            return res.status(401).json({ mensagem: 'Não autorizado' });
        }

        const { password: _, ...loggedUser } = userFound.dataValues;

        req.user = loggedUser;

        next();

    } catch (error: any) {
        return res.status(500).json(error.message);
    }
}

export {
    verifyLogin
}
