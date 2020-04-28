import { generate } from '../src/generate'

describe('sequential fn', () => {
  it('should generate given values ', async () => {
    const sequence = generate((el: number) => Promise.resolve(el))([1, 1, 1])
    for await (let n of sequence) {
      expect(n).toBe(1)
    }
  })

  it('should call then iteratee with correct arguments', async () => {
    let fnMock = jest.fn((el: number, idx: number, arr: number[]) =>
      Promise.resolve([el, idx, arr]),
    )
    const sequence = generate(fnMock)([1, 1, 1])
    for await (let n of sequence) {
      expect(n[0]).toBe(1)
    }
    expect(fnMock.mock.calls.length).toBe(3)
    expect(fnMock.mock.calls[0]).toEqual([1, 0, [1, 1, 1]])
  })
})
