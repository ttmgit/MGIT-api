import * as Knex from 'knex';

exports.seed = async (knex: Knex) => {
    await knex('usuarios').insert({
        id_rol: '1',
        correo: 'admin',
        password: 'admin',
        esta_activo: true,
        creado: new Date(),
        actualizado: new Date()
    });
};
