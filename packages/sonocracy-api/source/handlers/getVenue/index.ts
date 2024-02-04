import type {
    Request,
    Response,
} from 'express';

import {
    eq,
} from 'drizzle-orm';

import database from '../../database';
import {
    venues,
} from '../../database/schema/venues';

import {
    logger,
} from '../../utilities';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            id,
        } = request.body;

        const venue = await database.query.venues.findFirst({
            where: eq(venues.id, id),
        });
        if (!venue) {
            response.status(404).json({
                status: false,
            });
            return;
        }

        response.json({
            status: true,
            data: venue,
        });
    } catch (error) {
        logger('error', error);

        response.status(500).json({
            status: false,
        });
    }
}
