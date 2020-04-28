![build_status](https://github.com/jzyxyz/generator-utils/workflows/.github/workflows/test.yml/badge.svg)
![statements](./coverage/badge-statements.svg)  ![functions](./coverage/badge-functions.svg)

This repo contains functions that makes it easy to program with `AsyncGenerators` in a *functional programming* friendly way.

### API

-   flatten
    `<T>(array: AsyncGenerator<T, any, unknown>[]) => AsyncGenerator<T, void, unknown>`

-  generate
  `<T, R>(fn: (el: T, index?: number, arr?: T[]) => Promise<R>) => (arr: T[]) => AsyncGenerator<R, void, unknown>`

- iterate
  ```typescript
    interface IterateFn<T> {
        each?: EachFn<T>
        done?: DoneFn<T>
    }
    type EachFn<T> = (yielded?: T, index?: number) => Promise<any>
    type DoneFn<T> = (yieldedArray?: T[]) => Promise<any>
  ```
  `<T>(generator: AsyncGenerator<T, any, unknown>) => (fn: IterateFn<T>) => Promise<void>`

- iterateSync
  `eachFn` and `doneFn` are synchronous function rather than returning a promise.
