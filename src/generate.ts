/**
 * Force executing some async function synchronously
 * @template T,R
 * @param  {(el:T,index?:number,arr?:T[])=>Promise<R>} fn
 * @returns {(arr: T[]) => AsyncGenerator<R>}
 * @example
 * const generator = generate(({id}) => fetchById(id))([{id:1}])
 * iterate(generator, each, done)
 */
function generate<T, R>(
  fn: (el: T, index?: number, arr?: T[]) => Promise<R>,
): (arr: T[]) => AsyncGenerator<R> {
  return async function*(arr: T[]) {
    for (let i = 0; i < arr.length; i++) {
      yield await fn(arr[i], i, arr)
    }
  }
}

export default generate
