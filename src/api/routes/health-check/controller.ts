import { Get, HttpCode, JsonController, OnUndefined } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

/**
 * Rout to verify the health of the server
 */
@JsonController('/health-check')
export class HealthCheckController {
  @Get()
  @OpenAPI({ summary: 'verify if the API is running' })
  @HttpCode(204)
  @OnUndefined(204)
  get() {}
}
