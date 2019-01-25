import * as Knex from 'knex';

exports.seed = async (knex: Knex) => {
    await knex('oauth_client').insert( {
        name : 'Touch Pick',
        client_secret : 'Uxr21MHccXLfT7G9UiyT3TEJoeukG9axtQhL4RMw',
        client_id : 'pRKj87ZJd9AIupNbEdk3ZoEhcALnnTUgUPqhHngu',
        redirect_uri : null,
        grant_types : '[\"password\",\"refresh_token\"]',
        scope : null,
        user_id : 1
    });
};
