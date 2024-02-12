import { type Logger, HttpException, HttpStatus } from '@nestjs/common'
import {
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

export const handleError = (
  logger: Logger,
  methodName: string,
  params: object,
  message: string,
  status: number,
  error?: unknown,
) => {
  let returnError: HttpException
  let logMessage: string = ''

  if (
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientValidationError ||
    error instanceof PrismaClientRustPanicError
  ) {
    returnError = new DatabaseConnectionError()
    logMessage = 'Database connection'
  } else {
    returnError = new HttpException(message, status)
    logMessage = message
  }

  logger.error(`${logMessage} on method ${methodName}`)
  console.log({ error, params })

  return returnError
}

class DatabaseConnectionError extends HttpException {
  constructor() {
    super('Error initializing database client', HttpStatus.CONFLICT)
  }
}
