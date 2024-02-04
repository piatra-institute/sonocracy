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
    songBids,
} from '../../database/schema/songBids';



export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            venueID,
            song,
            bid,
        } = request.body;

        await database.insert(songBids).values({
            id: uuid(),
            createdAt: new Date().toISOString(),
            createdBy: 'user',
            venueID,
            song,
            value: bid,
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
