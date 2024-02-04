import {
    useRef,
    useState,
    useEffect,
} from 'react';

import {
    SonocracyVenue,

    VOTE_TIMEOUT,
} from '@/data';

import {
    apiCall,
} from '@/logic/utilities';

import VoteBar from '@/components/VoteBar';
import Toggle from '@/components/Toggle';



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

    const [
        maintainVote,
        setMaintainVote,
    ] = useState(false);

    const [
        voteCounter,
        setVoteCounter,
    ] = useState(VOTE_TIMEOUT);


    const voteVolume = async () => {
        await apiCall('/venue-vote-volume', {
            venueID: data.id,
            volume: volumeValueUser,
            maintainVote,
        });
    }

    const bidSong = async () => {
        await apiCall('/venue-bid-song', {
            venueID: data.id,
            songName: nextSongName,
            bid: nextSongBid,
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (!mounted.current) {
                return;
            }

            if (voteCounter === 1) {
                setVoteCounter(VOTE_TIMEOUT);
                setDisabledVolumeVote(false);
                return;
            }

            setVoteCounter(voteCounter - 1);
        }, 1_000);

        return () => {
            clearInterval(interval);
        }
    }, [
        voteCounter,
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
                <div>
                    next vote in {voteCounter}s
                </div>

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

                <div
                    className="w-[200px] m-auto my-8"
                >
                    <Toggle
                        text="maintain vote"
                        value={maintainVote}
                        toggle={() => {
                            setMaintainVote(!maintainVote);
                        }}
                        tooltip={(
                            <div>
                                if enabled, the current vote will be maintained for all the subsequent votes
                            </div>
                        )}
                    />
                </div>
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
                    disabled={nextSongName.length === 0}
                    onClick={() => {
                        bidSong();
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
