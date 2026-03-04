import { BaseProducer, KafkaMessage } from '@bankora/kafka-client'
import { USER_TOPICS } from '@bankora/constants'
import { producer } from '../kafka'

export interface UserRegisteredData {
  id: number
}

class UserRegisteredProducer extends BaseProducer<UserRegisteredData> {
  protected readonly topic = USER_TOPICS.USER_REGISTERED
  constructor() {
    super(producer)
  }
}
const userRegisteredProducer = new UserRegisteredProducer()

export const publishUserRegistered = async (data: KafkaMessage<UserRegisteredData>): Promise<void> => {
  await userRegisteredProducer.publish(data)
}
