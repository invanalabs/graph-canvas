/**
 * Generate utily functions
 */

type Dict = { [key: string]: any };

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
        if (overrides[key] instanceof HTMLElement || overrides[key] instanceof HTMLCanvasElement) {
          // Directly assign the HTMLElement or HTMLCanvasElement
          merged[key] = overrides[key]
        } else if (typeof merged[key] === 'object' && merged[key] !== null &&
                   !(merged[key] instanceof HTMLElement) && !(merged[key] instanceof HTMLCanvasElement)) {
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


