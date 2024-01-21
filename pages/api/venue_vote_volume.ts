import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';

import {
    logger,
} from '@/logic/utilities';



type ResponseData = {
    status: false;
} | {
    status: true;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const {
            venueID,
            volume,
        } = req.body;

        // console.log('venueID', venueID);
        // console.log('volume', volume);

        res.status(200).json({
            status: true,
        });
    } catch (error) {
        logger('error', error);

        res.status(400).json({
            status: false,
        });
    }
}
