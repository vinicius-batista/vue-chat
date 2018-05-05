import { getData } from '@/helpers/getData'
import { isNotEmpty } from '@/helpers/isNotEmpty'

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
    expect(isNotEmpty('not empty')).toBe(true)
    expect(isNotEmpty('')).toBe(false)
    expect(isNotEmpty(['not empty'])).toBe(true)
    expect(isNotEmpty([])).toBe(false)
  })
})
