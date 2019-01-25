import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.table('usuarios', (table) => {
            table.foreign('id_rol').references('id').inTable('roles');
        })
    ]);
};


exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.table('usuarios', (table) => {
            table.dropColumn('id_rol');
        })
    ]);
};
