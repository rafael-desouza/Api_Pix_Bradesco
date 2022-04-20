export class ValidationError extends Error {
  httpCode: number

  constructor(message?: string, httpCode?: number) {
    super(`Impossible to validate credentials: ${message ? message : 'Unknown error'}`)
    this.httpCode = httpCode ? httpCode : 500
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export class RequisitionFailedError extends Error {
  httpCode: number

  constructor(message?: string, httpCode?: number) {
    super(`Impossible to continue: ${message ? message : 'Unknown error'}`)
    this.httpCode = httpCode ? httpCode : 500
    Object.setPrototypeOf(this, RequisitionFailedError.prototype)
  }
}
