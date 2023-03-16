import Operand from './Operand'

type RequestProps<E extends Operand> = {
  timestamp?: number
  operands: E[]
}

class Request<E extends Operand> {
  timestamp: number
  operands: Operand[]

  constructor(props: RequestProps<E>) {
    this.timestamp = props.timestamp ?? Date.now()
    this.operands = props.operands
  }
}

export default Request
