import MapDrawer from '@/components/MapDrawer';



export default function RegisterVenue({
    back,
} : {
    back: () => void;
}) {
    return (
        <div
            className={`
                min-h-screen
                flex flex-col items-center justify-center py-2 text-center
            `}
        >
            <MapDrawer />

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
