export const logger = (
    kind: 'info' | 'error',
    ...args: any[]
) => {
    switch (kind) {
        case 'info':
            console.log(...args);
            break;
        case 'error':
            console.error(...args);
            break;
    }
}
