import { flatten } from '../src'
import { generator } from './generator'

describe('flatten function', () => {
  it('should flatten an array of generators', async () => {
    const spy = jest.fn((i) => i)
    const arr = [generator(), generator(), generator()]

    for await (const i of flatten(arr)) {
      spy(i)
      expect(i).toBe(1)
    }

    expect(spy).toBeCalledTimes(9)
  })
})
