import { flatten } from '../src'

describe('flatten function', () => {
  it('should flatten an array of generators', async () => {
    const spy = jest.fn((i) => i)
    const generator = async function* () {
      yield await Promise.resolve(1)
      yield await Promise.resolve(1)
      yield await Promise.resolve(1)
    }
    const arr = [generator(), generator(), generator()]

    for await (const i of flatten(arr)) {
      spy(i)
      expect(i).toBe(1)
    }

    expect(spy).toBeCalledTimes(9)
  })
})
