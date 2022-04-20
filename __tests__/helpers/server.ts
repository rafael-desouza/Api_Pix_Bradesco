import { Server } from 'http'

import { server as applicationServer } from '~/server'
import { PORT } from '~/config/env'

/**
 * Creating test server instance
 */
export let server: Server

/**
 * Starting testing server
 */
export const startServer = async (): Promise<void> => {
  const app = await applicationServer()
  server = app.listen(PORT, () => console.log(`Tests server started on port ${PORT}`))
}

/**
 * Closes testing server
 */
export const closeServer = async (): Promise<void> => {
  return new Promise(resolve => server.close(() => resolve()))
}
