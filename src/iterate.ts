/**
 * @template T
 * @param {AsyncGenerator<T>} generator
 * @param {(yielded?: T, index?:number) => Promise<any>} each this callback is called with the yielded value and index each time a new value is generated
 * @param {(yieldedArray?:T[]) => Promise<any>} done this callback is called with all the values from generator in the end
 */
async function iterate<T>(
  generator: AsyncGenerator<T>,
  each: (yielded?: T, index?: number) => Promise<any>,
  done: (yieldedArray?: T[]) => Promise<any>,
) {
  let final = []
  let i = 0
  for await (let yielded of generator) {
    i++
    final.push(yielded)
    await each(yielded, i)
  }
  await done(final)
}

export default iterate
