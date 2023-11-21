export async function mapAsync<T, U>(array: T[], call: (item: T) => U): Promise<U[]> {
  const newArray: U[] = []
  for (const item of array) {
    newArray.push(await call(item))
  }
  return newArray
}
