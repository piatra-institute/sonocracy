import type {
    Request,
    Response,
} from 'express';

import {
    logger,
} from '../../utilities';



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
