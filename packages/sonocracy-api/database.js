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
    id INTEGER PRIMARY KEY,  -- Integer primary key
    minX, maxX,              -- Minimum and maximum X coordinate
    minY, maxY               -- Minimum and maximum Y coordinate
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
    current_volume INTEGER NOT NULL
);`,
`CREATE INDEX IF NOT EXISTS nameIdx ON venues (name);`,

];


for (const table of tables) {
    await client.execute(table.trim());
}
