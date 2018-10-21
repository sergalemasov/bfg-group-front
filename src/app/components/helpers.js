export function className(classMap) {
    return Object.keys(classMap)
        .filter(className => !!classMap[className])
        .join(' ');
}

export function rgba(hexString, opacity) {
    const hexColor = hexString.slice(1);
    const decColor = parseInt(hexColor, 16);
    const colors = [];

    for (let i = hexColor.length / 2 - 1; i >= 0; i--) {
        const offset = 8 * i;
        const mask = 255 << offset;
        const decNumber = (decColor & mask) >> offset;

        colors.push(decNumber.toString());
    }

    return `rgba(${colors.join(', ')}, ${opacity || 0})`;
}
