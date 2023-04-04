import ResponseError from './ResponseError'

type ResponseProps<E> = {
  operationKey: number
  operationStatus: boolean
  result: E | undefined
  errors?: ResponseError[]
}

class Response<E> {
  readonly operationKey: number
  readonly operationStatus: boolean
  readonly result: E | undefined
  readonly errors: ResponseError[] | undefined

  constructor(props: ResponseProps<E>) {
    this.operationKey = props.operationKey
    this.operationStatus = props.operationStatus
    this.errors = props.errors
    this.result = props.result
  }

  static decode<E>(object: any, decoder?: (_: any) => E): Response<E> {
    const props = {
      operationKey: object.operationKey,
      operationStatus: object.operationStatus,
      result: object.operationStatus && decoder ? decoder(object.result) : object.result,
      errors: object.errors,
    } as ResponseProps<E>
    return new Response(props)
  }
}

export default Response
