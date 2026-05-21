export const formatDate = (date) => {
    const currentDate = new Date();
    const oldDate = new Date(date.toString());

    const secondsSince = Math.floor((currentDate - oldDate) / 1000);

    const minutesSince = Math.floor(secondsSince / 60);
    const hoursSince = Math.floor(minutesSince / 60);
    const daysSince = Math.floor(hoursSince / 24);

    if (secondsSince < 0) return oldDate.toLocaleDateString();

    if (secondsSince < 60) {
        return secondsSince === 1 ? "1 second ago" : `${secondsSince}s ago`;
    }

    if (minutesSince < 60) {
        return `${minutesSince}m ago`;
    }

    if (hoursSince < 24) {
        return `${hoursSince}h ago`;
    }

    if (daysSince < 7) {
        return `${daysSince}d ago`;
    }

    return oldDate.toDateString();
};
