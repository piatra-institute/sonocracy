import {
    gte,
    eq,
} from 'drizzle-orm';

import database from '../../database';
import {
    venues,
} from '../../database/schema/venues';
import {
    volumeVotes,
} from '../../database/schema/volumeVotes';



const VOTE_INTERVAL = 5_000;
const PAST_INTERVAL = 1145_000;

class Voter {
    constructor() {
        setInterval(async () => {
            const past = (
                new Date(Date.now() - PAST_INTERVAL)
            ).toISOString();


            const votes = await database
                .select()
                .from(volumeVotes)
                .where(
                    gte(volumeVotes.createdAt, past),
                );
            if (votes.length === 0) {
                return;
            }


            const venuesVotes: Record<string, number[]> = {};
            for (const vote of votes) {
                if (!venuesVotes[vote.venueID]) {
                    venuesVotes[vote.venueID] = [];
                }
                venuesVotes[vote.venueID].push(vote.vote);
            }


            for (const [venueID, votes] of Object.entries(venuesVotes)) {
                const volume = votes.reduce((a, b) => a + b) / votes.length;

                await database.update(venues).set({
                    currentVolume: volume,
                }).where(
                    eq(venues.id, venueID),
                );
            }


            for (const vote of votes) {
                await database.delete(volumeVotes).where(
                    eq(volumeVotes.id, vote.id),
                );
            }
        }, VOTE_INTERVAL);
    }

    async vote() {
        return true;
    }
}


const voter = new Voter();


export default voter;
