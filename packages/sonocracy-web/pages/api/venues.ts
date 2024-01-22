import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';

import {
    SonocracyVenue,
} from '@/data';

import {
    logger,
} from '@/logic/utilities';



type ResponseData = {
    status: false;
} | {
    status: true;
    data: SonocracyVenue[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const {
            latitude,
            longitude,
        } = req.body;

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

        res.status(200).json({
            status: true,
            data: venues,
        });
    } catch (error) {
        logger('error', error);

        res.status(400).json({
            status: false,
        });
    }
}
