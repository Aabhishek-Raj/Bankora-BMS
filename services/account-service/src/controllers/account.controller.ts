import { Request, Response } from 'express'
import { AccountService } from '../services/account.service'
import { AccountType } from '../entity/account.entity'
import { SAVINGS_ACCOUNT } from '../constants'
import { TransactionType } from '../types/transaction.types'
import z from 'zod'

const createSchema = z.object({
  accountType: z.nativeEnum(AccountType).optional().default(AccountType.SAVINGS),
  accountName: z.string().optional().default(SAVINGS_ACCOUNT),
})

const transactionSchema = z.object({
  accountNumber: z.string().length(15),
  amount: z.number().positive().multipleOf(0.01),
  type: z.nativeEnum(TransactionType),
})

export class AccountController {
  constructor(private accountService: AccountService) {}

  create = async (req: Request, res: Response) => {
    const { accountType, accountName } = createSchema.parse(req.body)

    const account = await this.accountService.create({
      userId: req.userId,
      accountType,
      accountName,
    })

    return res.status(201).json(account)
  }

  list = async (req: Request, res: Response) => {
    const accounts = await this.accountService.list(req.userId)

    return res.status(200).json(accounts)
  }

  get = async (req: Request, res: Response) => {
    const { accountNumber, userId } = req.params
    const account = await this.accountService.findByAccountNumber(accountNumber as string, parseInt(userId as string))

    return res.status(200).json(account)
  }

  delete = async (req: Request, res: Response) => {
    await this.accountService.delete(req.userId, req.params.accountNumber as string)

    return res.status(200).json({ message: 'account deleted' })
  }

  internalTransaction = async (req: Request, res: Response) => {
    const { accountNumber, amount, type } = transactionSchema.parse(req.body)

    const account = await this.accountService.updateBalance(accountNumber, type, amount)

    return res.status(200).json({
      message: `account transaction ${type} completed`,
      availableBalance: account.balance,
    })
  }
}
