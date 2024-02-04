'use client';

import {
    useRef,
    useState,
    useEffect,
    useCallback,
} from 'react';

import {
    SonocracyVenue,
} from '@/data';

import Menu from '@/components/Menu';

import Splashscreen from '@/containers/Splashscreen';
import VenueSelector from '@/containers/VenueSelector';
import Venue from '@/containers/Venue';

import useStore from '@/store';



export default function App() {
    const mounted = useRef(false);


    const {
        setLocation,
    } = useStore();


    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        loadingVenues,
        setLoadingVenues,
    ] = useState(false);

    const [
        venues,
        setVenues,
    ] = useState<SonocracyVenue[]>([
    ]);

    const [
        selectedVenue,
        setSelectedVenue,
    ] = useState('');


    const onGetLocation = async () => {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });

            return position;
        } catch (error) {
            return;
        }
    }

    const getLocation = useCallback(async () => {
        if (navigator.permissions && navigator.permissions.query) {
            const request = await navigator.permissions.query({ name: 'geolocation' });
            const permission = request.state;
            if (permission === 'granted' || permission === 'prompt' ) {
                return await onGetLocation();
            }
        } else if (navigator.geolocation) {
            return await onGetLocation();
        }
    }, []);

    const loadVenues = useCallback(async () => {
        setLoadingVenues(true);

        const position = await getLocation();
        if (!position) {
            setLoading(false);
            setLoadingVenues(false);

            return;
        }

        try {
            setLocation(
                position.coords.latitude,
                position.coords.longitude,
            );

            const request = await fetch('/api/venues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }),
            });
            const response = await request.json();
            if (!response.status) {
                setLoading(false);
                setLoadingVenues(false);
                return;
            }

            setVenues([
                ...response.data,
            ]);

            setLoading(false);
            setTimeout(() => {
                setLoadingVenues(false);
            }, 10);

            return true;
        } catch (error) {
            setLoading(false);
            setLoadingVenues(false);

            return;
        }
    }, [
        getLocation,
        setLocation,
    ]);


    useEffect(() => {
        if (mounted.current) {
            return;
        }

        mounted.current = true;

        loadVenues();
    }, [
        loadVenues,
    ]);


    if (loading) {
        return (
            <Splashscreen
                loadingVenues={loadingVenues}
                loadVenues={loadVenues}
                setLoadingVenues={setLoadingVenues}
            />
        );
    }

    if (!selectedVenue) {
        return (
            <>
                <VenueSelector
                    venues={venues}
                    setSelectedVenue={setSelectedVenue}

                    loadingVenues={loadingVenues}
                    loadVenues={loadVenues}
                    setLoadingVenues={setLoadingVenues}
                />

                <Menu />
            </>
        );
    }

    return (
        <>
            <Venue
                data={venues.find((venue) => venue.id === selectedVenue)!}
                back={() => setSelectedVenue('')}
            />

            <Menu />
        </>
    );
}
