
type Mergeable<T> = T extends object ? { [K in keyof T]: Mergeable<T[K]> } : T;

function isMergeable(obj: any): obj is object {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export function deepMerge<T extends object>(target: Mergeable<T>, ...sources: Mergeable<T>[]): Mergeable<T> {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isMergeable(target) && isMergeable(source)) {
        for (const key in source) {
            if (isMergeable(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMerge(target, ...sources);
}