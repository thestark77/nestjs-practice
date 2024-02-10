import type { FindOptionsWhere, Repository } from 'typeorm'
import type { QueryDeepPartialEntity } from './interfaces'

const RESULTS_LIMIT = 20
const getOffsetFromPage = (page: number) => {
  return (page - 1) * RESULTS_LIMIT
}

export const totalPages = async <T>(repository: Repository<T>) => {
  return repository.count()
}

export const getItems = async <T>(
  repository: Repository<T>,
  page: number = 1,
) => {
  if (page < 1) {
    page = 1
  }
  return await repository.find({
    skip: getOffsetFromPage(page),
    take: RESULTS_LIMIT,
  })
}

export const getItem = async <T>(
  repository: Repository<T>,
  where?: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
) => {
  return await repository.findOne({ where })
}

export const updateItem = async <T>(
  repository: Repository<T>,
  criteria:
    | string
    | number
    | Date
    | string[]
    | number[]
    | Date[]
    | FindOptionsWhere<T>,
  partialEntity: QueryDeepPartialEntity<T>,
) => {
  return await repository.update(criteria, partialEntity)
}

export const deleteItem = async <T>(
  repository: Repository<T>,
  criteria:
    | string
    | number
    | Date
    | string[]
    | number[]
    | Date[]
    | FindOptionsWhere<T>,
) => {
  return await repository.delete(criteria)
}
