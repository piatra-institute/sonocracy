import {
    useState,
} from 'react';

import {
    apiCall,
} from '@/logic/utilities';

import MapDrawer from '@/components/MapDrawer';

import Input from '@/common/components/Input';



export default function RegisterVenue({
    back,
} : {
    back: () => void;
}) {
    const [
        venueName,
        setVenueName,
    ] = useState('');


    const registerVenue = async (
        coordinates: number[][],
    ) => {
        if (
            !venueName
            || coordinates.length === 0
        ) {
            return;
        }

        await apiCall('/venue-register', {
            name: venueName,
            coordinates,
        });
    }


    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2 text-center
            `}
        >
            <Input
                text="venue name"
                value={venueName}
                setValue={(value) => {
                    setVenueName(value);
                }}
            />

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
