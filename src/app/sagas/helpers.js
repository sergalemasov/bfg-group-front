export function createRequestFn() {
    let controller = null;
    let isFetching = false;

    return function(url) {
        if (isFetching) {
            controller.abort();
            controller = null;
        }

        if (!controller) {
            controller = new AbortController();
        }

        isFetching = true;

        return fetch(url, { signal: controller.signal })
            .then(res => {
                isFetching = false;

                if (res.status < 300 && res.status >= 200) {
                    return res.json();
                } else {
                    throw res.json();
                }
            });
    }
}

export function createQuery(queryParams) {
    return Object.keys(queryParams)
        .reduce((queryPairs, paramName) => queryPairs.concat([`${paramName}=${queryParams[paramName]}`]), [])
        .join('&')
        .replace(/(.*)/, '?$1');
}
