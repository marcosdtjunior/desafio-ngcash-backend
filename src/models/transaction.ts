import { DataType } from 'sequelize-typescript';
import database from '../connection';

const Transaction = database.define('transaction', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    value: {
        type: DataType.DECIMAL,
        allowNull: false
    }
});

export default Transaction;