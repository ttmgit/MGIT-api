import * as Knex from 'knex';

exports.seed = async (knex: Knex) => {
    await knex('roles').insert([{
        id: 1,
        descripcion: 'Administrador de Sistema'
    }, {
        id: 2,
        descripcion: 'Empresa'
    }
    ]);
};
