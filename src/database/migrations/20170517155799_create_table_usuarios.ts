import * as Knex from 'knex';
import * as moment from 'moment';

exports.up = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.createTable('usuarios', (table) => {
            table.increments('id').primary();
            table.integer('id_rol').notNullable();
            table.string('correo').notNullable();
            table.string('password').notNullable();
            table.boolean('esta_activo').notNullable().defaultTo(true);
            table.dateTime('creado').notNullable().defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
            table.dateTime('actualizado').notNullable().defaultTo(moment().format('YYYY-MM-DD HH:mm:ss'));
        })
    ]);
};

exports.down = (knex: Knex): Promise<any> => {
    return Promise.all([
        knex.schema.dropTable('usuarios')
    ]);

};
