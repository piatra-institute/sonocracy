import {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    SonocracyVenue,
} from '@/data';

import VoteBar from '@/components/VoteBar';



export default function Venue({
    data,
    back
} : {
    data: SonocracyVenue,
    back: () => void,
}) {
    const mounted = useRef(false);


    const [
        volumeValueUser,
        setVolumeValueUser,
    ] = useState(50);

    const [
        disabledVolumeVote,
        setDisabledVolumeVote,
    ] = useState(false);

    const [
        nextSongName,
        setNextSongName,
    ] = useState('');

    const [
        nextSongBid,
        setNextSongBid,
    ] = useState(10);


    const voteVolume = async () => {
        fetch('/api/venue_vote_volume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                venueID: data.id,
                volume: volumeValueUser,
            }),
        });
    }


    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }

        return () => {
            mounted.current = false;
        }
    }, []);

    useEffect(() => {
        const voteTimeout = 30;

        setTimeout(() => {
            if (!mounted.current) {
                return;
            }

            setDisabledVolumeVote(false);
        }, 1_000 * voteTimeout);
    }, [
        disabledVolumeVote,
    ]);


    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2 text-center
                gap-12
            `}
        >
            <h1
                className="text-4xl font-bold mt-4"
            >
                {data.name}
            </h1>


            <div>
                <VoteBar
                    userValue={volumeValueUser}
                    setUserValue={setVolumeValueUser}
                    currentVote={data.currentVolume}
                />

                <button
                    className={`
                        min-w-[300px]
                        font-bold
                        border py-4 px-8 mt-4 rounded-full shadow-xl
                        hover:shadow hover:bg-red-800 disabled:bg-red-800 disabled:opacity-70
                    `}
                    disabled={disabledVolumeVote}
                    onClick={() => {
                        voteVolume();
                        setDisabledVolumeVote(true);
                    }}
                >
                    {disabledVolumeVote ? 'Voted' : 'Vote'} Volume {volumeValueUser}%
                </button>
            </div>


            <div
                className="flex flex-col items-center justify-center gap-4"
            >
                <input
                    value={nextSongName}
                    placeholder='bid next song'
                    onChange={(event) => {
                        setNextSongName(event.target.value);
                    }}
                    className="border rounded-full bg-red-500 px-4 py-2 mt-4 w-[500px] text-white text-center shadow-2xl placeholder-gray-300"
                />

                <button
                    className={`
                        min-w-[300px]
                        font-bold
                        border py-4 px-8 mt-4 rounded-full shadow-xl
                        hover:shadow hover:bg-red-800 disabled:bg-red-800 disabled:opacity-70
                    `}
                    disabled={false}
                    onClick={() => {
                    }}
                >
                    Bid ${nextSongBid}
                </button>
            </div>


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
