/**
 * Generate utily functions
 */

type Dict = Record<string, unknown>

/**
 * Merge two objects - use for overriding defaults with user input, which may
 * be partical data
 * @param target - data object on to which overrides should be applied
 * @param overrides - override values to be applied on target.
 * @returns Merged data
 */
export const deepMerge = (target: Dict, overrides: Dict): Dict => {
  const merged: Dict = { ...target }

  for (const key in overrides) {
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      if (typeof overrides[key] === 'object' && overrides[key] !== null) {
        if (typeof merged[key] === 'object' && merged[key] !== null) {
          merged[key] = deepMerge(merged[key] as Dict, overrides[key] as Dict)
        } else {
          merged[key] = deepMerge({}, overrides[key] as Dict)
        }
      } else {
        merged[key] = overrides[key]
      }
    }
  }

  return merged
}
