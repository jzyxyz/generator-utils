/**
 * Force executing some async function synchronously
 * @template T,R
 * @param  {(el:T,index?:number,arr?:T[])=>Promise<R>} fn
 * @returns {(arr: T[]) => AsyncGenerator<R>}
 * @example
 * const fetchById = id => Promise.resolve(id)
 * const generator = generate(fetchById))([1,2,3}])
 */
export const generate = function <T, R>(
  fn: (el: T, index?: number, arr?: T[]) => Promise<R>,
): (arr: T[]) => AsyncGenerator<R> {
  return async function* (arr: T[]) {
    for (let i = 0; i < arr.length; i++) {
      yield await fn(arr[i], i, arr)
    }
  }
}
