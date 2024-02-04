import {
    sqliteTable,
    text,
    index,
    integer,
    real,
} from 'drizzle-orm/sqlite-core';



export const venues = sqliteTable(
    'venues',
    {
        id: text('id').notNull().primaryKey(),
        createdAt: text('created_at').notNull(),
        createdBy: text('created_by').notNull(),
        name: text('name').notNull(),
        address: text('address').notNull(),
        postalCode: text('postal_code').notNull(),
        city: text('city').notNull(),
        region: text('region').notNull(),
        country: text('country').notNull(),
        currentVolume: integer('current_volume').notNull(),
        bidStart: real('bid_start').notNull(),
        locationIndexID: integer('location_index_id').notNull(),
    },
    (venues) => ({
        nameIdx: index('nameIdx').on(venues.name),
    }),
);
