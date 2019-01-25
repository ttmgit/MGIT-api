import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('oauth_refresh_token', (table) => {
            table.increments('id').primary();
            table.string('refresh_token', 300).notNullable();
            table.dateTime('expires');
            table.string('scope', 300);
            table.integer('client_id').unsigned();
            table.foreign('client_id').references('id').inTable('oauth_client');
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('id').inTable('usuarios')
                .onDelete('SET NULL')
                .onUpdate('CASCADE');
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('oauth_refresh_token')
    ]);
};
