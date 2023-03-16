class ListResponse<E> {
  total: number
  start: number
  items: E[]

  constructor(init: Partial<ListResponse<E>>, decoder: (_: any) => E) {
    this.total = init.total ?? 0
    this.start = init.start ?? 0
    this.items = init.items?.map((_) => decoder(_)) ?? []
  }

  static decodeWith<E>(decoder: (_: any) => E): (_: any) => ListResponse<E> {
    return (json: any) => {
      return new ListResponse(json, decoder)
    }
  }
}

export default ListResponse
