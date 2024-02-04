import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Required for zustand.
import type { } from '@redux-devtools/extension';



export interface State {
    user: any;
    setUser: (user: any) => void;

    location: {
        latitude: number;
        longitude: number;
    };
    setLocation: (latitude: number, longitude: number) => void;
}

const useStore = create<State>()(
    devtools(
    persist(
    immer(
        (set) => ({
            user: null,
            setUser: (user: any) => set({ user }),
            location: {
                latitude: 0,
                longitude: 0,
            },
            setLocation: (latitude: number, longitude: number) => set({ location: { latitude, longitude } }),
        }),
    ),
        {
            name: 'sncy-storage',
        },
    ),
    ),
);


export default useStore;
