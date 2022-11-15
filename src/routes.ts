import { Router } from 'express';
import database from './connection';
import { User, Account, Transaction } from './models/relationships';
// import { registerUser } from './controllers/users';

const router: Router = Router();

router.get('/', async (req, res) => {
    const models = { User, Account, Transaction };
    await database.sync();
    res.status(200).json({ mensagem: 'OK' });
});

// router.post('/user', registerUser);

router.get('/user', async (req, res) => {
    const insertionAccount = await Account.create({
        balance: 100
    });

    const account = await Account.findAll({ order: [['id', 'DESC']], limit: 1 });

    console.log(account);

    res.status(200).json({ mensagem: 'OK' });
})

export default router;