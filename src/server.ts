import 'reflect-metadata'

import path from 'path'
import { Express } from 'express'
import { createExpressServer, RoutingControllersOptions } from 'routing-controllers'
import { loadDocumentation } from './api/common/openApi'

/**
 * Loading controllers.
 */
const controllersPath = path.resolve(__dirname, 'api', 'routes', '**', 'controller.ts')

/**
 * Loading middlewares.
 */
const middlewaresPath = path.resolve(__dirname, 'api', 'middlewares', '**', '*.ts')

/**
 * Server options.
 */
export const serverOptions: RoutingControllersOptions = {
  cors: '*',
  defaultErrorHandler: false,
  controllers: [controllersPath],
  middlewares: [middlewaresPath]
}

/**
 * Creating server.
 */
const app: Express = createExpressServer(serverOptions)

export const server = async () => {
  loadDocumentation(app)
  return app
}
