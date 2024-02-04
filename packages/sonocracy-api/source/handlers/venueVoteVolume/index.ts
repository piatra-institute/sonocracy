import type {
    Request,
    Response,
} from 'express';

import {
    eq,
    and,
} from 'drizzle-orm';

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
            maintainVote,
        } = request.body;

        const currentUser = 'user';


        const existingVote = await database.query.volumeVotes.findFirst({
            where: and(
                eq(volumeVotes.createdBy, currentUser),
                eq(volumeVotes.venueID, venueID),
            ),
        });
        if (existingVote) {
            await database.update(volumeVotes).set({
                createdAt: new Date().toISOString(),
                vote: volume,
                maintainVote,
            }).where(
                eq(volumeVotes.id, existingVote.id),
            );
        } else {
            await database.insert(volumeVotes).values({
                id: uuid(),
                createdAt: new Date().toISOString(),
                createdBy: currentUser,
                venueID,
                vote: volume,
                maintainVote,
            });
        }


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
