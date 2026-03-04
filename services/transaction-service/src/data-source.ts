import { DataSource } from 'typeorm'
import { config } from './config'
import { Transaction } from './entity/transaction.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.service.databaseUrl,
  synchronize: true,
  logging: false,
  entities: [Transaction],
})
