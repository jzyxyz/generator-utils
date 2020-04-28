import { iterate } from '../src'
import { generator } from './generator'

describe('iterate fn', () => {
  let gen: () => AsyncGenerator<number, void, unknown> = generator
  let mockDone: jest.Mock<any, any>
  let mockEach: jest.Mock<any, any>
  beforeEach(() => {
    mockEach = jest.fn()
    mockDone = jest.fn()
  })
  it('should iterate with each function when new value is yielded', async () => {
    await iterate(gen())({ each: mockEach })
    expect(mockEach).toBeCalledTimes(3)
  })
  describe('done', () => {
    beforeEach(async () => {
      return iterate(gen())({ done: mockDone })
    })
    it('should be called once when all values are yielded', async () => {
      expect(mockDone).toBeCalledTimes(1)
    })
    it('should be called with correct arguments: all the values are yielded', async () => {
      expect(mockDone).toBeCalledWith([1, 1, 1])
    })
  })
})
