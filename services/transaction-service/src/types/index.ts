import { TransactionType } from '../entity/transaction.entity'

export interface CustomError extends Error {
  statusCode?: number
  status?: string
}

export interface BaseTransactionDto {
  sourceAccountNumber: string
  destinationAccountNumber: string
  amount: number
  transactionType: TransactionType
  note?: string
}

export interface TransferTransactionDto extends BaseTransactionDto {
  userId: number
}
