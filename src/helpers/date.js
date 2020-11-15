function withZero(number) {
    return number < 10 ? `0${number}` : number;
}

function parseDate(date) {
    const actualDate = new Date(date);
    const month = withZero(actualDate.getMonth() + 1);
    const day = withZero(actualDate.getDate());
    const hours = withZero(actualDate.getHours());
    const minutes = withZero(actualDate.getMinutes());
    return `${day}/${month}/${actualDate.getFullYear()} - ${hours}:${minutes}`;
}

export default parseDate