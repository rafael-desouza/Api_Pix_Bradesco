import { config } from 'dotenv'
import { resolve } from 'path'

import { EnvironmentDefault as Default, EnvironmentTypes } from '~/classes/environment'

export const isProductionEnvironment = () => process.env.NODE_ENV === EnvironmentTypes.PROD
export const isDevelopmentEnvironment = () => process.env.NODE_ENV === EnvironmentTypes.DEV
export const isTestEnvironment = () => process.env.NODE_ENV === EnvironmentTypes.TEST

/**
 * Loads the environment variables from the .env file.
 */
const fileName = (() => {
  if (isDevelopmentEnvironment()) return '.env.dev'
  if (isTestEnvironment()) return '.env.test'
  return '.env'
})()

config({ path: resolve(__dirname, '..', '..', fileName) })

export const { PORT = Default.PORT, BRADESCO_ENDPOINT = Default.BRADESCO_ENDPOINT, BRADESCO_CERT = Default.BRADESCO_CERT } = process.env
