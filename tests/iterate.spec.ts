import { iterate, iterateSync } from '../src'
// import { generator } from './generator'
async function* generator() {
  yield await Promise.resolve(1)
  yield await Promise.resolve(1)
  yield await Promise.resolve(1)
}

describe('iterate fn', () => {
  let mockDone: jest.Mock<any, any>
  let mockEach: jest.Mock<any, any>
  beforeEach(() => {
    mockEach = jest.fn()
    mockDone = jest.fn()
  })
  it('should iterate with each function when new value is yielded', async () => {
    await iterate(generator())({ each: mockEach })
    expect(mockEach).toBeCalledTimes(3)
  })
  describe('done', () => {
    beforeEach(async () => {
      return iterate(generator())({ done: mockDone })
    })
    it('should be called once when all values are yielded', async () => {
      expect(mockDone).toBeCalledTimes(1)
    })
    it('should be called with correct arguments: all the values are yielded', async () => {
      expect(mockDone).toBeCalledWith([1, 1, 1])
    })
  })
})

describe('iterateSync fn', () => {
  let mockDone: jest.Mock<any, any>
  let mockEach: jest.Mock<any, any>
  beforeEach(() => {
    mockEach = jest.fn()
    mockDone = jest.fn()
  })
  it('should iterate with each function when new value is yielded', async () => {
    await iterateSync(generator())({ each: mockEach })
    expect(mockEach).toBeCalledTimes(3)
  })
  describe('done', () => {
    beforeEach(async () => {
      return iterateSync(generator())({ done: mockDone })
    })
    it('should be called once when all values are yielded', async () => {
      expect(mockDone).toBeCalledTimes(1)
    })
    it('should be called with correct arguments: all the values are yielded', async () => {
      expect(mockDone).toBeCalledWith([1, 1, 1])
    })
  })
})
