import { Router } from 'express';
import database from './connection';
import { User, Account, Transaction } from './models/relationships';
import { login, registerUser, userBalance, getUsers } from './controllers/usersController';
import { verifyLogin } from './filters/verifyLogin';
import { depositValue, filterTransactions, getTransactions, transferValue, withdrawValue } from './controllers/transactionsController';

const router: Router = Router();

router.post('/database', async (req, res) => {
    const models = { User, Account, Transaction };
    await database.sync();
    res.status(200).json({ mensagem: 'Banco de dados criado com sucesso!' });
});

router.post('/user', registerUser);
router.post('/login', login);

router.use(verifyLogin);

router.get('/balance', userBalance);
router.get('/users', getUsers);
router.post('/deposit', depositValue);
router.post('/withdraw', withdrawValue);
router.post('/transfer', transferValue);
router.get('/getTransactions', getTransactions);
router.get('/filterTransactions', filterTransactions);

export default router;