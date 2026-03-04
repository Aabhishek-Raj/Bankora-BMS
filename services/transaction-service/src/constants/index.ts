export enum TransactionStatus {
  INITIATED = 'initiated',
  DEBIT_SUCCESS = 'debit_success',
  CREDIT_SUCCESS = 'credit_success',
  FAILED = 'failed',
  CREDIT_FAILED = 'credit_failed',
  DEBIT_COMPENSATE = 'debit_compensate',
  COMPENSATION_SUCCESS = 'compensation_success',
  COMPLETED = 'completed',
}

export const ERROR_CODES = {
  ACCOUNT_NOT_FOUND: 'ET01',
  INSUFFICIENT_BALANCE: 'ET02',
  TRANSACTION_FAILED: 'ET03',
}
