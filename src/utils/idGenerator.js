let counter = 1000

export function generateLocalId() {
  counter += 1
  return counter
}