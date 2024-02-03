import {
    sqliteTable,
    text,
    index,
    integer,
} from 'drizzle-orm/sqlite-core';



export const venues = sqliteTable(
    'venues',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        name: text('name').notNull(),
        city: text('city').notNull(),
        country: text('country').notNull(),
        currentVolume: integer('current_volume').notNull(),
    },
    (venues) => ({
        nameIdx: index('nameIdx').on(venues.name),
    }),
);
