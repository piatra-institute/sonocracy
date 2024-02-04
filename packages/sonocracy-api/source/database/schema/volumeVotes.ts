import {
    sqliteTable,
    text,
    integer,
} from 'drizzle-orm/sqlite-core';



export const volumeVotes = sqliteTable(
    'volume_votes',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        venueID: text('venue_id').notNull(),
        vote: integer('vote').notNull(),
        maintainVote: integer('maintain_vote', { mode: 'boolean' }).notNull().default(false),
    },
    (volumeVotes) => ({
    }),
);
