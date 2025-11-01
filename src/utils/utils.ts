
export const colSpan = {
    wrapperCol: { span: 15 },
    labelCol: { span: 7 },
}

export const generateUniqueId = (): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 10);
    return timestamp + randomStr
};

export const getNow = (): string => {
    const now = new Date();
    const formattedDateTime =
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    return formattedDateTime;
}
