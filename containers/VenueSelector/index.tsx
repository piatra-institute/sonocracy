import {
    SonocracyVenue,
} from '@/data';

import LookForVenues from '@/components/LookForVenues';




export default function VenueSelector({
    venues,
    setSelectedVenue,

    loadingVenues,
    loadVenues,
    setLoadingVenues,
} : {
    venues: SonocracyVenue[];
    setSelectedVenue: React.Dispatch<React.SetStateAction<string>>;

    loadingVenues: boolean;
    loadVenues: () => Promise<true | undefined>;
    setLoadingVenues: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    if (venues.length === 0) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center py-2 text-center"
            >
                <div>
                    no venues found around you
                </div>

                <div>
                    increase range
                </div>
            </div>
        );
    }

    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2 text-center
            `}
        >
            {venues.map((venue) => {
                return (
                    <div
                        key={venue.id}
                        onClick={() => {
                            setSelectedVenue(venue.id);
                        }}
                        className={`
                            min-w-[300px]
                            flex flex-col items-center justify-center
                            border p-8 m-4
                            text-center cursor-pointer select-none
                            rounded-full
                            hover:bg-red-800
                        `}
                    >
                        <div
                            className="text-xl mb-2"
                        >
                            {venue.name}
                        </div>

                        <div
                            className="text-sm text-gray-300"
                        >
                            {venue.address}
                        </div>
                    </div>
                );
            })}

            <LookForVenues
                loadingVenues={loadingVenues}
                loadVenues={loadVenues}
                setLoadingVenues={setLoadingVenues}
            />
        </div>
    );
}
