import { integer, text } from "drizzle-orm/sqlite-core/columns";
import { sqliteTable } from "drizzle-orm/sqlite-core/table";

export const blog = sqliteTable('blog', {
    id: integer().primaryKey({ autoIncrement: true }),
    content: text(),
    date: text()
});

export const release = sqliteTable('release', {
    id: integer().primaryKey({ autoIncrement: true }),
    release_name: text().notNull(),
    release_date: text().notNull(),
    album_cover: text().notNull(),
    spotify_link: text().notNull(),
    youtube_link: text().notNull(),
    bandcamp_link: text().notNull()
});

export const setlists = sqliteTable('setlists', {
    id: integer().primaryKey({ autoIncrement: true }),
    show_id: integer(),
    song_order: integer(),
    song_name: text(),
});

export const shows = sqliteTable('shows', {
    id: integer().primaryKey({ autoIncrement: true }),
    date: text().notNull(),
    venue: text(),
    venue_link: text(),
    poster: text(),
    event_link: text(),
    city: text(),
    province: text(),
    video_link: text()
});

export const songs = sqliteTable('songs', {
    id: integer().primaryKey({ autoIncrement: true }),
    song_name: text().notNull(),
    lyrics: text(),
    release_id: integer(),
    track_order: integer()
});
