export function prefixify(prefix, actions) {
    return Object.keys(actions)
        .map(actionKey => ({ [actionKey]: `${prefix} ${actions[actionKey]}` }))
        .reduce((acc, curr) => ({...acc, ...curr}), {});
}
