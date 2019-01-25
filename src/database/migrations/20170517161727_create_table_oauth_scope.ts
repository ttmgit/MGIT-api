import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('oauth_scope', (table) => {
            table.increments('id').primary();
            table.string('scope', 255);
            table.boolean('is_default');
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('oauth_scope')
    ]);

};
