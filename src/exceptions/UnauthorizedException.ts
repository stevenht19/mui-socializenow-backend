import { Exception } from './Exception'
import { HttpStatus } from './status'

export default class UnauthorizedException extends Exception {
  status: number

  constructor(message: string = 'Unauthorized') {
    super(message)
    this.status = HttpStatus.UNAUTHORIZED
    Object.setPrototypeOf(this, UnauthorizedException.prototype)
  }
}