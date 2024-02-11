import { HttpException } from '@nestjs/common'
export const errorHandler = (
  message: string,
  status: number,
  error?: unknown,
) => {
  const date = new Date()
  console.log({ message, error, status, date })
  return new HttpException(message, status)
}
