export const dataFormatter = (number) => new Intl.NumberFormat('en-US').format(number);

export const timeFormatter = (seconds) => {
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds >= 60 && seconds <= 1200) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m`;
    } else if (seconds > 1200 && seconds <= 3600) {
        const closestSeconds = [1200, 1500, 1800, 2100, 2400, 3000, 3600].reduce((a, b) => {
            return Math.abs(b - seconds) < Math.abs(a - seconds) ? b : a;
        });
        const minutes = closestSeconds / 60;
        return `${minutes}m`;
    } else if (seconds > 3600) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.round(remainingSeconds / 60 / 5) * 5;
        if (minutes === 60) {
            return `${hours}h 55m`
        }
        return `${hours}h ${minutes}m`;
    }
};
