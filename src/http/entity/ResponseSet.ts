import Response from './Response'
import ResponseError from './ResponseError'
import HttpStatus from '../enum/HttpStatus'

type ResponseSetProps<E> = {
  timestamp: number
  statusCode: HttpStatus
  message: string

  // 成功した時の項目
  total: number | undefined
  results: Response<E>[] | undefined

  // エラー時の項目
  errors: ResponseError[] | undefined
}

class ResponseSet<E> {
  readonly timestamp: number

  readonly statusCode: HttpStatus
  readonly message: string

  // 成功した時の項目
  readonly total: number | undefined
  readonly results: Response<E>[] | undefined

  // エラー時の項目
  readonly errors: ResponseError[] | undefined

  private constructor(props: ResponseSetProps<E>) {
    this.timestamp = props.timestamp
    this.statusCode = props.statusCode
    this.message = props.message
    this.total = props.total
    this.results = props.results
    this.errors = props.errors
  }

  private static buildResults<E>(result: E | E[]): Response<E>[] {
    return (Array.isArray(result) ? result : [result]).map(
      (_: E, index: number) => new Response({ operationKey: index, operationStatus: true, result: _ }),
    )
  }

  static ok<E>(result: E | E[]): ResponseSet<E> {
    const props = {
      timestamp: Date.now(),
      statusCode: 200,
      message: 'ok',
      results: this.buildResults(result),
    } as ResponseSetProps<E>
    return new ResponseSet(props)
  }

  static error<E>(statusCode: number, message: string): ResponseSet<E> {
    const props = {
      timestamp: Date.now(),
      statusCode: statusCode,
      message: message,
    } as ResponseSetProps<E>
    return new ResponseSet(props)
  }

  static decode<E>(object: any, decoder?: (_: any) => E): ResponseSet<E> {
    const props = {
      timestamp: object.timestamp,
      statusCode: object.statusCode,
      message: object.message,
      total: object.total,
      results: object.results?.map((_: any) => Response.decode(_, decoder)),
      errors: object.errors?.map((_: any) => ResponseError.decode(_)),
    } as ResponseSetProps<E>
    return new ResponseSet(props)
  }
}

export default ResponseSet
