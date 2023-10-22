async function getColor(text: string, minLightness = 40, maxLightness = 80, minSaturation = 30, maxSaturation = 100) {
    let hash = await window.crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
    const hashArr: number = parseInt(new Uint8Array(hash).join("").slice(16), 10);
    return "hsl(" + (hashArr % 360) + ", " + (hashArr % (maxSaturation - minSaturation) + minSaturation) + "%, " + (hashArr % (maxLightness - minLightness) + minLightness) + "%)";
}

export const  generateColor = (text: string) => {
    return getColor(text)
}

