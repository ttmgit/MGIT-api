import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('roles', (table) => {
            table.integer('id').primary();
            table.string('descripcion').notNullable();
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('roles')
    ]);
};
