export const parseLocalTime = (dateString: string): Date => {
    const normalized = dateString.replace('T', ' ').replace(/-/g, '/');
    const parts = normalized.split(' ');
    if (parts.length >= 2) {
        const dateParts = parts[0].split('/');
        const timeParts = parts[1].split(':');
        return new Date(
            parseInt(dateParts[0], 10),
            parseInt(dateParts[1], 10) - 1,
            parseInt(dateParts[2], 10),
            parseInt(timeParts[0], 10) || 0,
            parseInt(timeParts[1], 10) || 0,
            parseInt(timeParts[2], 10) || 0
        );
    }
    return new Date(dateString);
};

export const formatTime = (dateString: string): string => {
    const date = parseLocalTime(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
};

export const formatDate = (dateString: string): string => {
    const date = parseLocalTime(dateString);
    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};