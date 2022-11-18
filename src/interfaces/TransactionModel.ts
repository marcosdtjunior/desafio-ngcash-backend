export interface TransactionModel {
    id: number,
    debitedAccountId: number,
    creditedAccountId: number,
    value: number
}