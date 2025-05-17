import { Router } from 'express';
import database from './connection';
import { User, Account, Transaction } from './models/relationships';
import { login, registerUser, userBalance, getUsers } from './controllers/usersController';
import { verifyLogin } from './filters/verifyLogin';
import { depositValue, filterTransactions, getTransactions, transferValue, withdrawValue } from './controllers/transactionsController';

const router = Router();

router.post('/database', async (req, res) => {
    const models = { User, Account, Transaction };
    await database.sync();
    res.status(200).json({ mensagem: 'Banco de dados criado com sucesso!' });
});

function asyncHandler(fn: any) {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

router.post('/user', asyncHandler(registerUser));
router.post('/login', asyncHandler(login));

router.use(asyncHandler(verifyLogin));

router.get('/balance', asyncHandler(userBalance));
router.get('/users', asyncHandler(getUsers));
router.post('/deposit', asyncHandler(depositValue));
router.post('/withdraw', asyncHandler(withdrawValue));
router.post('/transfer', asyncHandler(transferValue));
router.get('/getTransactions', asyncHandler(getTransactions));
router.get('/filterTransactions', asyncHandler(filterTransactions));

export default router;