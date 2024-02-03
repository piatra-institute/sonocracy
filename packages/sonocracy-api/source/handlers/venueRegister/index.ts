import type {
    Request,
    Response,
} from 'express';

import { v4 as uuid } from 'uuid';

import {
    logger,
} from '../../utilities';

import database from '../../database';
import {
    venues,
} from '../../database/schema/venues';
import {
    venueLocationIndex,
} from '../../database/schema/venuesLocations';



const parseLocation = (
    boundary: any,
) => {

    return {
        country: '',
        city: '',
        square: {
            maxX: 0,
            maxY: 0,
            minX: 0,
            minY: 0,
        },
    };
}

export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            name,
            boundary,
        } = request.body;

        const {
            country,
            city,
            square,
        } = parseLocation(boundary);


        await database.insert(venues).values({
            id: uuid(),
            name,
            createdAt: Date.now() + '',
            createdBy: 'user',
            country,
            city,
            currentVolume: 0,
        });

        await database.insert(venueLocationIndex).values({
            id: 0,
            minX: square.minX,
            maxX: square.maxX,
            minY: square.minY,
            maxY: square.maxY,
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
