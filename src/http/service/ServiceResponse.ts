import ResponseError from '../entity/ResponseError'
import ResponseSet from '../entity/ResponseSet'
import HttpStatus from '../enum/HttpStatus'
import { Logger } from '@accelhack-org/utils'
import { ClientUtils } from '../../utils/ClientUtils'

class ServiceResponse<E> {
  readonly responseSet: ResponseSet<E>

  public constructor(responseSet: ResponseSet<E>) {
    this.responseSet = responseSet
  }

  public success(func: (result: E) => void): ServiceResponse<E> {
    if (ClientUtils.is2xx(this.responseSet.statusCode) && !this.responseSet.errors) {
      this.responseSet.results?.forEach((res) => {
        if (res.operationStatus && res.result) {
          return func(res.result)
        }
      })
    }
    return this
  }

  public failure(func: (error: ResponseError[]) => void): ServiceResponse<E> {
    if (ClientUtils.is2xx(this.responseSet.statusCode) && !this.responseSet.errors) {
      this.responseSet.results?.forEach((res) => {
        if (!res.operationStatus) {
          return func(res.errors ?? [])
        }
      })
    }
    return this
  }

  public authError(func: (error: ResponseError[]) => void): ServiceResponse<E> {
    if (this.responseSet.statusCode == HttpStatus.UNAUTHORIZED) {
      func(this.responseSet.errors ?? [])
    }
    return this
  }

  public connectionError(func: (error: ResponseError[]) => void): ServiceResponse<E> {
    if (this.responseSet.statusCode == HttpStatus.NO_CONNECTION) {
      func(this.responseSet.errors ?? [])
    }
    return this
  }

  public serverError(func: (error: ResponseError[]) => void): ServiceResponse<E> {
    const codes = [HttpStatus.FORBIDDEN, HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR]
    if (this.responseSet.statusCode == HttpStatus.OK && this.responseSet.errors) {
      func(this.responseSet.errors ?? [])
    } else if (codes.includes(this.responseSet.statusCode)) {
      func(this.responseSet.errors ?? [])
    }
    return this
  }

  public on2xx(success: (result: E) => void, failure?: (error: ResponseError[]) => void): ServiceResponse<E> {
    if (ClientUtils.is2xx(this.responseSet.statusCode)) {
      this.responseSet.results?.forEach((res) => {
        if (res.operationStatus && res.result) {
          success(res.result)
        } else {
          failure?.(res.errors ?? [])
        }
      })
    }
    return this
  }

  public on4xx(func: (status: number, error: ResponseError[]) => void): ServiceResponse<E> {
    if (ClientUtils.is4xx(this.responseSet.statusCode)) {
      func(this.responseSet.statusCode, this.responseSet.errors ?? [])
    }
    return this
  }

  public on5xx(func: (status: number, error: ResponseError[]) => void): ServiceResponse<E> {
    if (ClientUtils.is5xx(this.responseSet.statusCode)) {
      func(this.responseSet.statusCode, this.responseSet.errors ?? [])
    }
    return this
  }

  public unhandledException(func: (error: ResponseError[]) => void): ServiceResponse<E> {
    if (!Object.values(HttpStatus).includes(this.responseSet.statusCode)) {
      Logger.error('unhandled response', this.responseSet)
      func(this.responseSet.errors ?? [])
    }
    return this
  }
}

export default ServiceResponse
