import { type HttpException } from '@nestjs/common'

export type HttpReturn<T> = Promise<T | HttpException>
