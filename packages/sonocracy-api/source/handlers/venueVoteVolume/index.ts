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
    volumeVotes,
} from '../../database/schema/volumeVotes';


export default async function handler(
    request: Request,
    response: Response,
) {
    try {
        const {
            venueID,
            volume,
        } = request.body;

        await database.insert(volumeVotes).values({
            id: uuid(),
            createdAt: Date.now() + '',
            createdBy: 'user',
            venueID,
            vote: volume,
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
