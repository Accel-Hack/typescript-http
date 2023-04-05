import { describe } from 'node:test'
import { ClientUtils } from '../../src/utils/ClientUtils'

describe('ClientUtils', () => {
  describe('is2xx', () => {
    const from = 200
    const to = 299
    const testCases: any[][] = [
      [from - 1, false],
      [from, true],
      [to, true],
      [to + 1, false],
    ]
    it.each(testCases)('is2xx status=%p expecting=%p', (status: number, result: boolean) => {
      console.log('status', status)
      console.log('result', result)
      expect(ClientUtils.is2xx(status)).toEqual(result)
    })
  })
  describe('is3xx', () => {
    const from = 300
    const to = 399
    const testCases: any[][] = [
      [from - 1, false],
      [from, true],
      [to, true],
      [to + 1, false],
    ]
    it.each(testCases)('is3xx status=%p expecting=%p', (status: number, result: boolean) => {
      expect(ClientUtils.is3xx(status)).toEqual(result)
    })
  })
  describe('is4xx', () => {
    const from = 400
    const to = 499
    const testCases: any[][] = [
      [from - 1, false],
      [from, true],
      [to, true],
      [to + 1, false],
    ]
    it.each(testCases)('is4xx status=%p expecting=%p', (status: number, result: boolean) => {
      expect(ClientUtils.is4xx(status)).toEqual(result)
    })
  })
  describe('is5xx', () => {
    const from = 500
    const to = 599
    const testCases: any[][] = [
      [from - 1, false],
      [from, true],
      [to, true],
      [to + 1, false],
    ]
    it.each(testCases)('is5xx status=%p expecting=%p', (status: number, result: boolean) => {
      expect(ClientUtils.is5xx(status)).toEqual(result)
    })
  })
})
