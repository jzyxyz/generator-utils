/**
 * @template T
 * @param {AsyncGenerator<T>[]} array a array of `asyncGenerator`s
 * @returns {AsyncGenerator<T>} returns a single generator that yields from each of the generator is the array
 */
export const flatten = function <T>(
  array: AsyncGenerator<T>[],
): AsyncGenerator<T, void> {
  return {
    [Symbol.asyncIterator]: async function* () {
      const [head, ...rest] = array
      yield* head
      if (rest.length) {
        yield* flatten(rest)
      }
    },
  } as AsyncGenerator<T, void>
}
