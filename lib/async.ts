export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(0), time)
  })
}
