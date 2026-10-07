import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { blog, release, setlists, shows, songs } from './tables';
import { getTableConfig } from "drizzle-orm/sqlite-core";

export const sqlite = new Database("sqlite.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle({ client: sqlite });


export function initTables() {
    const tables = [blog, release, setlists, shows, songs];

    tables.forEach(table => {
        const config = getTableConfig(table);
        const columns = config.columns
            .map((col) => {
                let def = `"${col.name}" ${col.getSQLType()}`;

                if (col.primary) {
                    def += ' PRIMARY KEY';
                    if ('autoIncrement' in col) {
                        def += ' AUTOINCREMENT';
                    }
                }

                if (col.notNull) {
                    def += ' NOT NULL';
                }

                return def;
            })
            .join(', ');
        const createTableSQL = `CREATE TABLE IF NOT EXISTS "${config.name}" (${columns})`;
        sqlite.exec(createTableSQL);
    });
    console.log('init');
}