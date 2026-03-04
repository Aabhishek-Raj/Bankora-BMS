import { Repository } from 'typeorm'
import { Transaction } from '../entity/transaction.entity'
import { AppDataSource } from '../data-source'
import { TransferTransactionDto } from '../types'
import { ERROR_CODES, TransactionStatus } from '../constants'
import logger from '../config/logger'
import { createError } from '../utils'

export class TransactionService {
  transactionRepository: Repository<Transaction>

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction)
  }

  create = async (data: TransferTransactionDto): Promise<Transaction> => {
    try {
      const transaction = new Transaction()

      transaction.userId = data.userId
      transaction.sourceAccountNumber = data.sourceAccountNumber
      transaction.destinationAccountNumber = data.destinationAccountNumber
      transaction.amount = data.amount
      transaction.transactionType = data.transactionType
      transaction.note = data.note || ''
      transaction.status = TransactionStatus.INITIATED

      await this.transactionRepository.save(transaction)

      logger.info(`transaction initiated with ID: ${transaction.transactionId}`)

      return transaction
    } catch (error) {
      logger.error('failed to create transaction', error)
      throw createError('failed to create transaction', 500, ERROR_CODES.TRANSACTION_FAILED)
    }
  }
}

export const transactionService = new TransactionService()
