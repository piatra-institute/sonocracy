export interface SonocracyVenue {
    id: string;
    name: string;
    address: string;
    currentVolume?: number;
}



export const ENVIRONMENT = {
    API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:9090',
};


export const VOTE_TIMEOUT = 40; // seconds
