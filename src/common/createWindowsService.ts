import 'reflect-metadata'

import path from 'path'
import { Service, ServiceConfig } from 'node-windows'
import { EventLogger } from 'node-windows'
import { logger } from './logger'

const serviceLog = new EventLogger()

/**
 * Defining options.
 */
const options: ServiceConfig = {
  name: 'Fsis Pix',
  description: 'Integrador Sisplan',
  script: path.join(__dirname, '..', 'index.js'),
  nodeOptions: '--harmony',
  stopparentfirst: true,
  env: {
    name: 'NODE_ENV',
    value: 'production'
  }
}

/**
 * Create a new service object.
 */
export const srv = () => {
  const srv = new Service(options)

  srv.on('install', () => {
    srv.start()
    logger.info('Windows FSIS service installed!')
    serviceLog.info('Windows FSIS service installed!')
  })

  srv.on('uninstall', () => {
    logger.info('Windows FSIS service uninstalled!')
    serviceLog.info('Windows FSIS service uninstalled!')
  })

  srv.on('start', async () => {
    logger.info('Windows FSIS service running!')
    serviceLog.info('Windows FSIS service running!')
  })

  srv.on('stop', async () => {
    logger.info('Windows FSIS service stopped!')
    serviceLog.info('Windows FSIS service stopped!')
  })

  srv.on('invalidinstallation', () => {
    logger.error('Windows FSIS service invalid installation!')
    serviceLog.error('Windows FSIS service invalid installation!')
  })

  srv.on('error', () => {
    logger.error('Windows FSIS service error!')
    serviceLog.error('Windows FSIS service error!')
  })

  return srv
}
