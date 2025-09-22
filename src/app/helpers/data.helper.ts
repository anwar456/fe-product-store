import get from 'lodash/get'

export function isJson(str: any) {
  let extract: any
  try {
    extract = JSON.parse(str)
  } catch (e) {
    return false
  }
  return extract ? true : false
}

/**
 *
 * @param {*} str data string json
 * @returns
 */
export function stringToJSON(str: string, def = '') {
  let result: string

  try {
    result = JSON.parse(str)
  } catch (e) {
    result = def
  }

  return result
}
/**
 *
 * @param {*} str data string json
 * @returns
 */
export function JSONtoString(json: any) {
  let result = ''

  try {
    result = JSON.stringify(json)
  } catch (e) {
    result = 'false'
  }

  return result
}
/** JSON RESETTER */
export function JSONResetter(json: any) {
  return stringToJSON(JSONtoString(json))
}

export function getRootParentIdByParentId(data: any, parentId: any) {
  // Create a map for quick lookup by id
  const itemMap = new Map(data.map((item: any) => [item.id, item]))

  let currentId = parentId

  // Traverse upwards to find the root parent
  while (itemMap.has(currentId)) {
    const item: any = itemMap.get(currentId)

    // If parentId is empty, we've found the root
    if (!item.parentId || item.parentId === '') {
      return currentId
    }

    // Otherwise, move to the parent
    currentId = item.parentId
  }

  return null // Return null if no root found
}

export function addParentIdRoot(data: any) {
  // First, create a map of all items by id for easy lookup
  const itemMap = new Map(data.map((item: any) => [item.id, item]))

  // Helper function to find the root parent
  function findRootParent(item: any) {
    while (item.parentId) {
      item = itemMap.get(item.parentId)
    }
    return item.id
  }

  // Loop through each item, assigning the parentIdRoot
  data.forEach((item: any) => {
    item.parentIdRoot = findRootParent(item)
  })

  return data
}

export const calculateSum = (data = [], field: string) => {
  return data.reduce((sum: any, item: any) => sum + get(item, field), 0)
}
