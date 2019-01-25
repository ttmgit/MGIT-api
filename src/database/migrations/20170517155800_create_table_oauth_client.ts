import * as Knex from 'knex';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('oauth_client', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('client_secret', 100).notNullable();
            table.string('client_id', 100).notNullable();
            table.string('redirect_uri', 2000);
            table.string('grant_types', 80);
            table.string('scope', 255);
            table.integer('user_id').unsigned();
            table.foreign('user_id').references('usuarios.id')
                .onDelete('SET NULL')
                .onUpdate('CASCADE');
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('oauth_client')
    ]);

};
