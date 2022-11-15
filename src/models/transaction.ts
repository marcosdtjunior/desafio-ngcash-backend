import { DataTypes } from 'sequelize';
import database from '../connection';

const Transaction = database.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Transaction;