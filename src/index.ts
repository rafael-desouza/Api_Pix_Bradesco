import { server } from './server'

import { PORT } from './config/env'

/**
 * Connecting to database and starting server
 */
server().then(app => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
