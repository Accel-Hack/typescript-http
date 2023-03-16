type ResponseErrorProps = {
  key: string
  value: any
  code: string
}

class ResponseError {
  readonly key: string
  readonly value: any
  readonly code: string

  private constructor(props: ResponseErrorProps) {
    this.key = props.key
    this.value = props.value
    this.code = props.code
  }

  static decode(object: any): ResponseError {
    return new ResponseError(object)
  }
}

export default ResponseError
