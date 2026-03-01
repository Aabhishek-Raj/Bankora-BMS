import RedisClient from '@bankora/redis-client'
import { config } from '.'

export const redisClient = new RedisClient(config.service.redisUrl)

export default redisClient.getInstance()
