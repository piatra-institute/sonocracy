import {
    sqliteTable,
    text,
    real,
    index,
} from 'drizzle-orm/sqlite-core';



export const songBids = sqliteTable(
    'song_bids',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        song: text('song').notNull(),
        value: real('value').notNull(),
    },
    (songBids) => ({
        songIdx: index('songIdx').on(songBids.song),
    }),
);
