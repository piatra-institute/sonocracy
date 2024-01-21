import {
    useRef,
    useState,
} from 'react';

import Draggable from 'react-draggable';



export default function VoteBar({
    userValue,
    currentVote,
    setUserValue,
} : {
    userValue: number,
    currentVote: number | undefined,
    setUserValue: React.Dispatch<React.SetStateAction<number>>,
}) {
    const nodeRef = useRef(null);


    const [
        draggableKey,
        setDraggableKey,
    ] = useState(Math.random() + '');


    const valueFromPercent = (percent: number) => {
        return percent / 100 * 480;
    }


    return (
        <div
            className="relative w-[300px] h-[40px] m-auto my-4 md:w-[500px]"
        >
            <div
                className={`
                    select-none cursor-pointer
                    absolute top-0 rounded-full left-0
                    h-[40px] w-[300px] md:w-[500px]
                    bg-gradient-to-r from-orange-300 via-red-500 to-amber-900
                `}
                onClick={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const percent = Math.ceil(x / rect.width * 100);

                    setUserValue(percent);
                    setDraggableKey(Math.random() + '');
                }}
            />

            <Draggable
                key={draggableKey}
                nodeRef={nodeRef}
                axis="x"
                handle=".votebar-handle"
                defaultPosition={{x: valueFromPercent(userValue) , y: 0}}
                bounds={{
                    left: 12,
                    right: 480,
                }}
                scale={1}
                onStop={(_event, data) => {
                    const percent = Math.ceil(data.x / 480 * 100);
                    setUserValue(percent);
                }}
            >
                <div
                    ref={nodeRef}
                    className="votebar-handle h-[40px] w-[10px] z-20 bg-white rounded-full cursor-pointer absolute"
                />
            </Draggable>

            {currentVote !== undefined && (
                 <div
                    className="h-[40px] w-[10px] z-10 bg-white opacity-30 rounded-full select-none pointer-events-none absolute"
                    style={{
                        left: currentVote + '%',
                    }}
                />
            )}
        </div>
    );
}
