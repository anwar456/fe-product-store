export function getObjectKeys(obj: any) {
  const keys: any = []
  if (obj) {
    Object.keys(obj)?.map((field: string) => {
      keys.push(field)
    })
  }

  return keys
}
