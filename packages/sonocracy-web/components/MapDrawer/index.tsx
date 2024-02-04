'use client';

import {
    useRef,
    useEffect,
    useState,
} from 'react';

// HACK: type mismatch
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import {
    ENVIRONMENT,
} from '@/data';

import useStore from '@/store';



mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


export default function MapDrawer() {
    const mapContainer = useRef(null);
    const map = useRef<any>(null);


    const {
        location,
    } = useStore();

    const [lat, setLat] = useState(location.latitude);
    const [lng, setLng] = useState(location.longitude);
    const [zoom, setZoom] = useState(15);
    const [coordinates, setCoordinates] = useState<(number[])[]>([]);


    const registerVenue = async () => {
        console.log('registerVenue', coordinates);

        await fetch (ENVIRONMENT.API_DOMAIN + '/venue-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Venue',
                coordinates,
            }),
        });
    }


    useEffect(() => {
        if (map.current) {
            // Initialize map only once.
            return;
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        if (!map.current) {
            // Map is not initialized yet.
            return;
        }

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                polygon: true,
                trash: true,
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon',
        });
        map.current.addControl(draw);

        function updateArea(_event: any) {
            const data = draw.getAll();
            if (data.features.length > 0) {
                try {
                    const coordinates = (data.features[0].geometry as any).coordinates[0];
                    setCoordinates(coordinates);
                } catch (error) {
                    return;
                }
            }
        }

        function clearArea() {
            setCoordinates([]);
        }

        map.current.on('draw.create', updateArea);
        map.current.on('draw.update', updateArea);
        map.current.on('draw.delete', clearArea);
    });

    useEffect(() => {
        setLat(location.latitude);
        setLng(location.longitude);
    }, [
        location,
    ]);


    return (
        <div>
            <h1>MapDrawer</h1>

            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div
                ref={mapContainer}
                className="map-container"
                style={{
                    height: '300px',
                }}
            />

            <button
                onClick={() => {
                    registerVenue();
                }}
            >
                register
            </button>
        </div>
    );
}
