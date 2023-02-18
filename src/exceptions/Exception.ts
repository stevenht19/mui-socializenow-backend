export abstract class Exception extends Error {
  abstract status: number

  constructor(message?: string) {
    super(message)
    Object.setPrototypeOf(this, Exception.prototype)
  }
}


