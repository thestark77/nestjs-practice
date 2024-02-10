import { type HttpException } from '@nestjs/common'
import type { DeepPartial } from 'typeorm'

export type HttpReturn<T> = Promise<T | HttpException>

export type QueryDeepPartialEntity<T> = DeepPartial<T> & object
