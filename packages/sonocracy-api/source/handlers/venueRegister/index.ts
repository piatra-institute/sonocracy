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
            bidStart,
        } = request.body;

        const currentUser = 'user';

        const {
            square,
            metadata,
        } = await parseVenueLocation(coordinates);

        const minMax = mapSquareToMinMax(square);

        const venueLocationIndexResult = await database.insert(venueLocationIndex).values({
            minX: minMax.minX,
            maxX: minMax.maxX,
            minY: minMax.minY,
            maxY: minMax.maxY,
        });
        const locationIndexID = Number(venueLocationIndexResult.lastInsertRowid);
        if (!locationIndexID) {
            response.status(500).json({
                status: false,
            });
            return;
        }

        await database.insert(venues).values({
            id: uuid(),
            name,
            createdAt: new Date().toISOString(),
            createdBy: currentUser,
            ...metadata,
            currentVolume: 0,
            bidStart: parseFloat(bidStart) || 1,
            locationIndexID,
        });

        response.json({
            status: true,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
