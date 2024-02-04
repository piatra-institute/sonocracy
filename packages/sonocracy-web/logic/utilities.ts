import {
    ENVIRONMENT,
} from '@/data';

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


export const apiCall = async (
    path:
        | '/venue-register'
        | '/venue-vote-volume'
        | '/venue-bid-song',
    data: any,
) => {
    try {
        const response = await fetch(
            ENVIRONMENT.API_DOMAIN + path,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        return await response.json();
    } catch (error) {
        logger('error', error);

        return;
    }
}
