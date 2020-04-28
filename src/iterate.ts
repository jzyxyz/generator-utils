type EachFn<T> = (yielded?: T, index?: number) => Promise<any>
type DoneFn<T> = (yieldedArray?: T[]) => Promise<any>
type EachFnSync<T> = (yielded?: T, index?: number) => any
type DoneFnSync<T> = (yieldedArray?: T[]) => any
interface IterateFn<T> {
  each?: EachFn<T>
  done?: DoneFn<T>
}

interface IterateFnSync<T> {
  each?: EachFnSync<T>
  done?: DoneFnSync<T>
}

/**
 * @template T
 * @param {AsyncGenerator<T>} generator
 * @param {(yielded?: T, index?:number) => Promise<any>} each this callback is called with the yielded value and the index each time a new value is generated
 * @param {(yieldedArray?:T[]) => Promise<any>} done this callback is called with all the values from generator in the end
 */
export const iterate = function <T>(generator: AsyncGenerator<T>) {
  return async function (fn: IterateFn<T>) {
    const { each, done } = fn
    let final = []
    let i = 0
    for await (let yielded of generator) {
      i++
      final.push(yielded)
      each && (await each(yielded, i))
    }
    done && (await done(final))
  }
}

/**
 * @template T
 * @param {AsyncGenerator<T>} generator
 * @param {(yielded?: T, index?:number) => any} each this callback is called with the yielded value and the index each time a new value is generated
 * @param {(yieldedArray?:T[]) => any} done this callback is called with all the values from generator in the end
 */
export const iterateSync = function <T>(generator: AsyncGenerator<T>) {
  return async function (fn: IterateFnSync<T>) {
    const { each, done } = fn
    let final = []
    let i = 0
    for await (let yielded of generator) {
      i++
      final.push(yielded)
      each && each(yielded, i)
    }
    done && done(final)
  }
}
