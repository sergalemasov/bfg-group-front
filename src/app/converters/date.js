const millisecondsInSecond = 1000;

export function convertDateToSecondsFromEpoch(date) {
    return Math.floor(date.getTime() / millisecondsInSecond);
}

export function convertSecondsFromEpochToDate(secondsFromEpoch) {
    return new Date(secondsFromEpoch * millisecondsInSecond);
}
