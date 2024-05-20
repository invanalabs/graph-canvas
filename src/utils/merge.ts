type Dict = { [key: string]: any };

const deepMerge = (target: Dict, source: Dict): Dict => {
    const merged: Dict = { ...target };

    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (typeof merged[key] === 'object' && merged[key] !== null) {
                merged[key] = deepMerge(merged[key], source[key]);
            } else {
                merged[key] = deepMerge({}, source[key]);
            }
        } else {
            merged[key] = source[key];
        }
    }

    return merged;
}


export default deepMerge;