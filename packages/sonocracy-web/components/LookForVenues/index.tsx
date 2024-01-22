export default function LookForVenues({
    loadingVenues,
    loadVenues,
    setLoadingVenues,
} : {
    loadingVenues: boolean;
    loadVenues: () => Promise<true | undefined>;
    setLoadingVenues: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <button
            className={`
                min-w-[300px]
                font-bold pointer-events-auto
                border py-4 px-8 mt-14 rounded-full shadow-xl
                hover:shadow hover:bg-red-800 disabled:bg-red-800 disabled:opacity-70
            `}
            onClick={async () => {
                setLoadingVenues(true);
                const loadedVenues = await loadVenues();
                if (!loadedVenues) {
                    setLoadingVenues(false);
                }
            }}
            disabled={loadingVenues}
        >
            {loadingVenues ? 'looking' : 'look'} for venues nearby
        </button>
    );
}
