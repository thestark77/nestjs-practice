import { HttpException } from '@nestjs/common'
export const errorHandler = (message: string, status: number) => {
  return new HttpException(message, status)
}
