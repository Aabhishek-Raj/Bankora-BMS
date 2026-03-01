import { DataSource } from 'typeorm'
import { Account } from './entity/account.entity'
import { config } from './config'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.service.databaseUrl,
  synchronize: true,
  logging: false,
  entities: [Account],
})
