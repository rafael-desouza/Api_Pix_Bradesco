import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

import { serverOptions } from '~/server'

/**
 * Loads documentation routes to Express server
 */
export const loadDocumentation = (app: Express): void => {
  //Parse all routing-controllers classes into OpenAPI specification
  const storage = getMetadataArgsStorage()

  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({ refPointerPrefix: '#/components/schemas/' })

  /**
   * Generate specs
   */
  const spec = routingControllersToSpec(storage, serverOptions, {
    components: {
      schemas
    },
    info: { title: 'Sisplan-Pix', version: '0.1' }
  })

  /**
   * Create docs route
   */
  app.use('/docs', serve, setup(spec))
}
