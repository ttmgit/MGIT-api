import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('oauth_access_token', (table) => {
            table.increments('id').primary();
            table.string('access_token', 300).notNullable();
            table.dateTime('expires');
            table.string('scope', 300);
            table.integer('client_id').unsigned();
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('usuarios.id')
                .onDelete('SET NULL')
                .onUpdate('CASCADE');
            table.foreign('client_id').references('oauth_client.id');
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('oauth_access_token')
    ]);
};
