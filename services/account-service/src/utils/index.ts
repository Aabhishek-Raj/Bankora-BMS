import { customAlphabet } from 'nanoid'
import { AccountType } from '../entity/account.entity'

const numericId = customAlphabet('0123456789', 9)

export const createError = (message: string, statusCode: number, errorCode = 'E0'): Error => {
  return Object.assign(new Error(message), { statusCode, errorCode })
}

const accountTypeMap = {
  [AccountType.SAVINGS]: '11',
  [AccountType.CURRENT]: '13',
}

// returns 15 digits account number
export const generateAccountNumber = (accountType: AccountType): string => {
  const now = new Date()

  const year = now.getFullYear().toString().slice(-2) // YY
  const month = String(now.getMonth() + 1).padStart(2, '0') // MM

  const typeCode = accountTypeMap[accountType]
  const randomPart = numericId()

  return `${typeCode}${year}${month}${randomPart}`
}
