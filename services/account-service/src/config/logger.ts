import { config } from '.'
import { getLogger } from '@bankora/logger'

const logger = getLogger(config.service.name, config.service.logLevel)

export default logger
