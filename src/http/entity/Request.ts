import Operand from './Operand'

type RequestProps<E extends Operand> = {
  timestamp?: number
  operands: E[]
}

class Request<E extends Operand> {
  timestamp: number = Date.now()
  operands: E[]

  constructor(props: RequestProps<E>) {
    this.timestamp = props.timestamp ?? Date.now()
    this.operands = props.operands
  }
}

export default Request
