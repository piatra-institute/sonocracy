export interface Coordinate {
    latitude: number;
    longitude: number;
}



const EARTH_RADIUS = 6371000;


export function haversineDistance(
    coord1: Coordinate,
    coord2: Coordinate,
) {
    const dLat = (coord2.latitude - coord1.latitude) * (Math.PI / 180);
    const dLon = (coord2.longitude - coord1.longitude) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + (
        Math.cos(coord1.latitude * (Math.PI / 180))
        * Math.cos(coord2.latitude * (Math.PI / 180))
        * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    );
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS * c;

    return distance;
}


export function calculateSquareCoordinates(
    center: Coordinate,
    sideLength: number = 30,
) {
    const latRad = center.latitude * (Math.PI / 180);

    const latOffset = (sideLength / EARTH_RADIUS) * (180 / Math.PI);
    const lonOffset = (sideLength / EARTH_RADIUS) * (180 / Math.PI) / Math.cos(latRad);

    const upperLeft = { latitude: center.latitude + latOffset, longitude: center.longitude - lonOffset };
    const upperRight = { latitude: center.latitude + latOffset, longitude: center.longitude + lonOffset };
    const lowerLeft = { latitude: center.latitude - latOffset, longitude: center.longitude - lonOffset };
    const lowerRight = { latitude: center.latitude - latOffset, longitude: center.longitude + lonOffset };

    return { upperLeft, upperRight, lowerLeft, lowerRight };
}
