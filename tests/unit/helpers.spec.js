import { getData } from '@/helpers/getData'
import { isNotEmpty } from '@/helpers/isNotEmpty'
import { isExpired } from '@/helpers/isExpired'
import { authHeader } from '@/helpers/authHeader'
import { isArraySizeDivisor } from '@/helpers/isArraySizeDivisor'
import { isToday } from '@/helpers/isToday'

describe('Helpers tests', () => {
  test('getData test', () => {
    const responseMock = {
      data: {
        somePath: {
          foo: 'bar'
        }
      }
    }
    expect(getData('somePath', responseMock)).toEqual({ foo: 'bar' })
  })

  test('isNotEmpty test', () => {
    expect(isNotEmpty('not empty')).toBeTruthy()
    expect(isNotEmpty('')).toBeFalsy()
    expect(isNotEmpty(['not empty'])).toBeTruthy()
    expect(isNotEmpty([])).toBeFalsy()
  })

  test('isExpired test', () => {
    const oldDate = '1450786210'
    const furtherDate = '1580674802'
    expect(isExpired(oldDate)).toBeTruthy()
    expect(isExpired(furtherDate)).toBeFalsy()
  })

  test('authHeader test', () => {
    const requestMock = {
      foo: 'bar',
      bar: 'foo',
      headers: {}
    }
    const expected = {
      foo: 'bar',
      bar: 'foo',
      headers: {
        authorization: 'Bearer some-token'
      }
    }

    expect(authHeader(requestMock, 'some-token')).toEqual(expected)
  })

  test('isArraySizeDivisor test', () => {
    const array = [1, 2, 3]
    expect(isArraySizeDivisor(array, 3)).toBeTruthy()
    expect(isArraySizeDivisor(array, 2)).toBeFalsy()
  })

  test('isToday test', () => {
    expect(isToday(new Date())).toBeTruthy()
    expect(isToday(new Date('2017-12-12'))).toBeFalsy()
  })
})
