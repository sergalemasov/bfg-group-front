const millisecondsInSecond = 1000;

export function convertDateToSecondsFromEpoch(date) {
    return Math.floor(date.getTime() / millisecondsInSecond);
}

export function convertSecondsFromEpochToDate(secondsFromEpoch) {
    return new Date(secondsFromEpoch * millisecondsInSecond);
}

export function fromDatePicker(dateString) {
    if (!dateString) {
        return null;
    }

    const [
        year,
        month,
        day
    ] = dateString
        .split('-')
        .map(value => parseInt(value, 10));

    return new Date(year, month - 1, day);
}

export function getOffsetInHours(date) {
    const timezoneOffset = date.getTimezoneOffset();

    return timezoneOffset / (-60);
}

export function toDatePicker(date) {
    if (!date) {
        return '';
    }
    const clonedDate = new Date(date);
    const hoursOffset = getOffsetInHours(clonedDate);

    clonedDate.setHours(hoursOffset);

    return clonedDate.toISOString().slice(0, 10);
}
