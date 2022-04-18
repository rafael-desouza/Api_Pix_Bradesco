import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: Response, next: NextFunction) {
    /**
     * Status 500 is to guarantee that uncaught errors are not going to return success statuses.
     */
    response.statusCode = error.httpCode ? error.httpCode : 500

    /**
     * JSON response to be sent as body.
     */
    const responseJSONError = {
      code: response.statusCode,
      message: error.message,
      errors: error.errors
    }
    response.json(responseJSONError)

    next()
  }
}
