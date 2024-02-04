import type {
    Request,
    Response,
} from 'express';

import { sql } from 'drizzle-orm';

import database from '../../database';

import {
    logger,
} from '../../utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            latitude,
            longitude,
        } = request.body;

        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            response.status(400).json({
                status: false,
            });

            return;
        }

        const locations = await database.query.venueLocationIndex.findMany({
            where: sql`minX<=${longitude} AND maxX>=${longitude} AND minY<=${latitude} AND maxY>=${latitude};`,
        });

        const venues = [];
        for (const location of locations) {
            const venue = await database.query.venues.findFirst({
                where: sql`location_index_id = ${location.id}`,
            });
            if (!venue) {
                continue;
            }

            venues.push(venue);
        }

        response.json({
            status: true,
            data: venues,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
