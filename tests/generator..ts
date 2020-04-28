export const generator = async function* () {
  yield await Promise.resolve(1)
  yield await Promise.resolve(1)
  yield await Promise.resolve(1)
}
