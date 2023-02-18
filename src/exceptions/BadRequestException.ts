import { Exception } from './Exception'
import { HttpStatus } from './status'

export default class UnauthorizedException extends Exception {
  status: number

  constructor(message: string = 'Bad Request') {
    super(message)
    this.status = HttpStatus.BAD_REQUEST
    Object.setPrototypeOf(this, UnauthorizedException.prototype)
  }
}