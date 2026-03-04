import { Request, Response } from 'express'
import logger from '../config/logger'
import { TransactionType } from '../entity/transaction.entity'
import { TransactionService } from '../services/transaction.service'
import z from 'zod'

const transferSchema = z.object({
  sourceAccountNumber: z.string().min(15, 'source account number is required'),
  destinationAccountNumber: z.string().min(15, 'destination account number is required'),
  amount: z.number().positive('Amount must be greater than zero'),
  note: z.string().optional(),
})

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  transfer = async (req: Request, res: Response) => {
    const { sourceAccountNumber, destinationAccountNumber, amount, note = '' } = transferSchema.parse(req.body)

    const userId = req.userId

    const transaction = await this.transactionService.create({
      userId,
      sourceAccountNumber,
      destinationAccountNumber,
      amount,
      transactionType: TransactionType.TRANSFER,
      note,
    })

    logger.info(`created new transaction: ${transaction.transactionId}`)

    res.status(201).json({
      transactionId: transaction.transactionId,
      status: transaction.status,
    })
  }
}
