

// export const stringToColor = (value: string) => {
//     let hash = 0;
//     for (let i = 0; i < value.length; i++) {
//         hash = value.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     return `hsl(${hash % 360}, 85%, 35%)`;
// };

export const stringToColor = (str: string) => {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }