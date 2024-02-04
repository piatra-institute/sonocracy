import { createClient } from '@libsql/client';

import dotenv from 'dotenv';



dotenv.config({
    path: '.env',
});


const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
});


const tables = [
`CREATE VIRTUAL TABLE IF NOT EXISTS venue_location_index USING rtree(
    id INTEGER PRIMARY KEY,
    minX, maxX,
    minY, maxY
);`,

`CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    payments TEXT NOT NULL
);`,
`CREATE UNIQUE INDEX IF NOT EXISTS emailIdx ON users (email);`,

`CREATE TABLE IF NOT EXISTS venues (
    id TEXT NOT NULL PRIMARY KEY,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    current_volume INTEGER NOT NULL,
    bid_start REAL NOT NULL,
    location_index_id INTEGER NOT NULL
);`,
`CREATE INDEX IF NOT EXISTS nameIdx ON venues (name);`,

`CREATE TABLE IF NOT EXISTS volume_votes (
    id TEXT PRIMARY KEY NOT NULL,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    venue_id TEXT NOT NULL,
    vote INTEGER NOT NULL
);`,

`CREATE TABLE IF NOT EXISTS song_bids (
    id TEXT PRIMARY KEY NOT NULL,
    created_at TEXT NOT NULL,
    created_by TEXT NOT NULL,
    venue_id TEXT NOT NULL,
    song TEXT NOT NULL,
    value REAL NOT NULL
);`,
`CREATE INDEX IF NOT EXISTS songIdx ON song_bids(song);`,

];


for (const table of tables) {
    const tableName = table.match(/CREATE (?:VIRTUAL )?TABLE IF NOT EXISTS (\w+)/);
    if (tableName) {
        console.log('Creating table', tableName[1]);
    } else {
        const index = table.match(/CREATE (?:UNIQUE )?INDEX IF NOT EXISTS (\w+)/);
        if (index) {
            console.log('Creating index', index[1]);
        }
    }

    await client.execute(table.trim());
}
