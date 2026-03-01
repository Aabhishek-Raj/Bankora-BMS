import { Router } from 'express'
import { AccountController } from '../controllers/account.controller'
import { accountService } from '../services/account.service'

const accountRouter = Router()
const accountController = new AccountController(accountService)

accountRouter.post('/', accountController.create)
accountRouter.get('/', accountController.list)
accountRouter.get('/:accountNumber', accountController.get)

accountRouter.delete('/:accountNumber', accountController.delete)

accountRouter.post('/internal/transaction', accountController.internalTransaction)

export { accountRouter }
