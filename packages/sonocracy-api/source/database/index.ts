import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schemaUsers from './schema/users';
import * as schemaVenues from './schema/venues';
import * as schemaVenuesLocations from './schema/venuesLocations';
import * as schemaVolumeVotes from './schema/volumeVotes';
import * as songBids from './schema/songBids';



const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
});

const database = drizzle(client, {
    schema: {
        ...schemaUsers,
        ...schemaVenues,
        ...schemaVenuesLocations,
        ...schemaVolumeVotes,
        ...songBids,
    },
});


export default database;
