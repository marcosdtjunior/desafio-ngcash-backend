import { DataType } from 'sequelize-typescript';
import database from '../connection';

const Account = database.define('account', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    balance: {
        type: DataType.DECIMAL,
        allowNull: false
    }
});

export default Account;