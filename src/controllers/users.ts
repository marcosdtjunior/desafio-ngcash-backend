import { User, Account, Transaction } from '../models/relationships';
import Yup from 'yup';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const mandatoryData = Yup.object().shape({
        username: Yup.string().required({ mensagem: 'É necessário informar o username do usuário' }),
        password: Yup.string().required({ mensagem: 'É necessário informar a senha do usuário' })
    });

    try {
        await mandatoryData.validate(req.body);
    } catch (error) {
        return res.status(400).json(error.message);
    }

    const insertionAccount = await Account.create({
        balance: 100
    });

    const account = await Account.findAll({ order: [['id', 'DESC']], limit: 1 });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertionUser = await User.create({
        username,
        password: encryptedPassword,
        accountId: account.dataValues.id;
    });

    const user = await User.findOne({ where: { username } });

    const { password: _, userData } = user;
}

export {
    registerUser
};