import { server } from './server'
import { PORT } from './config/env'
import { logger } from './common/logger'

/**
 * Connecting to database and starting server
 */
server().then(app => app.listen(PORT, () => logger.info(`Server started on port ${PORT}`)))
