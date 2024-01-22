import Image from 'next/image';

import LookForVenues from '@/components/LookForVenues';



export default function Splashscreen({
    loadingVenues,
    loadVenues,
    setLoadingVenues,
} : {
    loadingVenues: boolean;
    loadVenues: () => Promise<true | undefined>;
    setLoadingVenues: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2
                text-center
                select-none pointer-events-none
                pulsing-gradient
            `}
        >
            <Image
                src="/sonocracy-logo.png"
                alt="Sonocracy Logo"
                width={200}
                height={200}
                priority={true}
            />

            <h1
                className="text-4xl font-bold mt-4"
            >
                sonocracy
            </h1>

            <div
                className="mt-4"
            >
                vote for volume
                <br />
                <span
                    className='text-xs uppercase font-bold'
                >
                    democracy
                </span>
            </div>

            <div
                className="mt-4"
            >
                bid for song
                <br />
                <span
                    className='text-xs uppercase font-bold'
                >
                    oligarchy
                </span>
            </div>

            <LookForVenues
                loadingVenues={loadingVenues}
                loadVenues={loadVenues}
                setLoadingVenues={setLoadingVenues}
            />
        </div>
    );
}
