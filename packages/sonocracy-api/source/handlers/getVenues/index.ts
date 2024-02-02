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
            latitude,
            longitude,
        } = request.body;

        // based on the latitude and longitude, find the venues
        // in the database which are close to the given location

        const venues = [
            {
                id: 'abcd',
                name: 'Bar de Lune',
                address: 'Rue de la Lune 1',
                currentVolume: 30,
            },
            {
                id: 'efgh',
                name: 'Bar de Soleil',
                address: 'Rue de la Lune 2',
            },
        ];

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
