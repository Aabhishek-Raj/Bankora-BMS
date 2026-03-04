import KafkaClient from '@bankora/kafka-client'
import { config } from '../config'
import logger from '../config/logger'
import { USER_TOPICS } from '@bankora/constants'

const kafka = new KafkaClient(config.service.name, [config.service.kafkaBroker])

export const producer = kafka.getProducer()
const admin = kafka.getAdmin()

export const createTopicsIfNotExists = async () => {
  await admin.connect()

  try {
    const created = await admin.createTopics({
      topics: [
        {
          topic: USER_TOPICS.USER_REGISTERED,
          numPartitions: 1,
          replicationFactor: 1,
        },
      ],
      waitForLeaders: true,
    })

    if (created) {
      logger.info('Kafka topics created successfully')
    } else {
      logger.info('Kafka topics already exist')
    }
  } catch (error) {
    logger.error('Failed to create Kafka topics', error)
    throw error
  } finally {
    await admin.disconnect()
  }
}

export const connectKafka = async () => {
  try {
    await kafka.connect()
    logger.info('Kafka producer connected')
  } catch (error) {
    logger.error('Failed to connect Kafka producer-consumer', error)
    throw error
  }
}

export const disconnectKafka = async () => {
  try {
    await kafka.disconnect()
    logger.info('Kafka producer disconnected')
  } catch (error) {
    logger.error('Failed to disconnect Kafka producer', error)
  }
}
