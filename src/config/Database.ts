/**
 * config.Database
 * ------------------------------------
 *
 * Here we configure our database connection and
 * our ORM 'bookshelf'.
 *
 * Here would be the place to add more bookshelf plugins.
 */

import * as knex from 'knex';
import * as bookshelf from 'bookshelf';

const poolMin = process.env.DB_POOL_MIN || '0';
const poolMax = process.env.DB_POOL_MAX || '10';


export const DatabaseConfig = {
    debug: process.env.DB_DEBUG === 'true',
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    pool: {
        min: parseInt(poolMin, 10),
        max: parseInt(poolMax, 10)
    },
    migrations: {
        directory: process.env.DB_MIGRATION_DIR,
        tableName: process.env.DB_MIGRATION_TABLE
    },
    seeds: {
        directory: process.env.DB_SEEDS_DIR
    }
};

export const Knex = (): knex => knex(DatabaseConfig);

export const Bookshelf: bookshelf = bookshelf(Knex() as any);
Bookshelf.plugin(['bookshelf-camelcase']);
