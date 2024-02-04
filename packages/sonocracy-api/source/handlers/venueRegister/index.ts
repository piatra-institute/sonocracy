import type {
    Request,
    Response,
} from 'express';

import { v4 as uuid } from 'uuid';

import database from '../../database';
import {
    venues,
} from '../../database/schema/venues';
import {
    venueLocationIndex,
} from '../../database/schema/venuesLocations';

import {
    parseVenueLocation,
    mapSquareToMinMax,
} from '../../logic/coordinates';

import {
    logger,
} from '../../utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            name,
            coordinates,
        } = request.body;

        const {
            square,
            metadata,
        } = await parseVenueLocation(coordinates);

        await database.insert(venues).values({
            id: uuid(),
            name,
            createdAt: Date.now() + '',
            createdBy: 'user',
            ...metadata,
            currentVolume: 0,
        });

        const minMax = mapSquareToMinMax(square);

        await database.insert(venueLocationIndex).values({
            id: 0,
            minX: minMax.minX,
            maxX: minMax.maxX,
            minY: minMax.minY,
            maxY: minMax.maxY,
        });

        response.json({
            status: true,
            data: {

            },
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
