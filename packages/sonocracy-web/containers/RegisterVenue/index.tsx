import {
    ENVIRONMENT,
} from '@/data';

import MapDrawer from '@/components/MapDrawer';



export default function RegisterVenue({
    back,
} : {
    back: () => void;
}) {
    const registerVenue = async (
        coordinates: number[][],
    ) => {
        await fetch (ENVIRONMENT.API_DOMAIN + '/venue-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Venue',
                coordinates,
            }),
        });
    }


    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2 text-center
            `}
        >
            <MapDrawer
                registerVenue={registerVenue}
            />

            <button
                onClick={() => {
                    back();
                }}
                className={`
                    mt-8
                `}
            >
                back
            </button>
        </div>
    );
}
