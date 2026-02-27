export const createError = (message: string, statusCode: number): Error => {
  return Object.assign(new Error(message), { statusCode })
}

export class HttpError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode

    Object.setPrototypeOf(this, HttpError.prototype)
  }
}
