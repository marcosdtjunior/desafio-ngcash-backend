import User from './user';
import Account from './account';
import Transaction from './transaction';

Account.hasOne(User);
User.belongsTo(Account, {
    foreignKey: 'accountId'
});

Account.hasMany(Transaction);
Transaction.belongsTo(Account, {
    foreignKey: 'debitedAccountId'
});
Transaction.belongsTo(Account, {
    foreignKey: 'creditedAccountId'
});

export {
    User,
    Account,
    Transaction
}