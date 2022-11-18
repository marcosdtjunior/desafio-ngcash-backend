import { Router } from 'express';
import database from './connection';
import { User, Account, Transaction } from './models/relationships';
import { registerUser } from './controllers/usersController';
import { registerAccount } from './controllers/accountsController';

const router: Router = Router();

router.post('/database', async (req, res) => {
    const models = { User, Account, Transaction };
    await database.sync();
    res.status(200).json({ mensagem: 'Banco de dados criado com sucesso!' });
});

router.post('/user', registerUser);
router.post('/account', registerAccount);

export default router;