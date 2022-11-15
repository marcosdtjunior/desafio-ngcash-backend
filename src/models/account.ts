import { DataTypes } from 'sequelize';
import database from '../connection';

const Account = database.define('account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Account;