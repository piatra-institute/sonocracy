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


export function findSquareCoordinates(
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


export function mapSquareToMinMax(
    data: {
        upperLeft: Coordinate,
        upperRight: Coordinate,
        lowerLeft: Coordinate,
        lowerRight: Coordinate,
    },
) {
    return {
        minX: data.upperLeft.longitude,
        maxX: data.upperRight.longitude,
        minY: data.lowerLeft.latitude,
        maxY: data.upperLeft.latitude,
    };
}


/**
 * ```
 * [ [longitude, latitude] ]
 * ```
 *
 * @param coordinates
 * @returns
 */
export const findCentroid = (
    coordinates: (number[])[],
) => {
    const latitudes = coordinates.reduce((acc, coord) => acc + coord[1], 0);
    const longitudes = coordinates.reduce((acc, coord) => acc + coord[0], 0);

    const latitude = latitudes / coordinates.length;
    const longitude = longitudes / coordinates.length;

    return {
        latitude,
        longitude,
    };
}


/**
 * ```
 * [ [longitude, latitude] ]
 * ```
 *
 * @param coordinates
 * @returns
 */
export function findLongestEdge(
    coords: (number[])[],
) {
    let longestEdge = 0;
    let longestEdgeIndex = -1;

    for (let i = 0; i < coords.length - 1; i++) {
        const edgeLength = haversineDistance(
            {
                latitude: coords[i][1],
                longitude: coords[i][0],
            },
            {
                latitude: coords[i + 1][1],
                longitude: coords[i + 1][0],
            }
        );

        if (edgeLength > longestEdge) {
            longestEdge = edgeLength;
            longestEdgeIndex = i;
        }
    }

    return {
        index: longestEdgeIndex,
        length: longestEdge,
    };
}


export const reverseGeocoding = async (
    latitude: number,
    longitude: number,
) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.MAPBOX_API_KEY}`;

    const request = await fetch(url);
    const data: any = await request.json();
    const [
        addressData,
        postcodeData,
        placeData,
        regionData,
        countryData,
    ] = data.features;

    const address = addressData.text + ' ' + addressData.address;
    const postalCode = postcodeData.text;
    const city = placeData.text;
    const region = regionData.text;
    const country = countryData.text;

    return {
        address,
        postalCode,
        city,
        region,
        country,
    };
}


/**
 * ```
 * [ [longitude, latitude] ]
 * ```
 *
 * @param coordinates
 * @returns
 */
export const parseVenueLocation = async (
    coordinates: (number[])[],
) => {
    const centroid = findCentroid(coordinates);
    const longestEdge = findLongestEdge(coordinates);
    const square = findSquareCoordinates(centroid, longestEdge.length);
    const metadata = await reverseGeocoding(centroid.latitude, centroid.longitude);

    return {
        metadata,
        square,
    };
}
