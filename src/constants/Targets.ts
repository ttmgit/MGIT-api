/**
 * constants.Targets
 * ------------------------------------------------
 *
 * This is for our IOC so have a unique key/target for
 * our controllers, services and repositories
 *
 * This file is generated with the task `$ npm run console update:targets`.
 */

export const Targets = {
    Model:     {
        OAuth: {
            OAuthAccessToken: 'OAuthAccessToken',
            OAuthAuthorizationCode: 'OAuthAuthorizationCode',
            OAuthClient: 'OAuthClient',
            OAuthRefreshToken: 'OAuthRefreshToken',
            OAuthScope: 'OAuthScope'
        },
        Roles: {
            Roles: 'Roles'
        },
        Usuarios: {
            Usuarios: 'Usuarios'
        },
        Formularios: {
            Formularios: 'Formularios'
        },
        Preguntas: {
            Preguntas: 'Preguntas'
        },
        Indicadores: {
            Indicadores: 'Indicadores'
        },
        EmpresasTieneFormularios: {
            EmpresasTieneFormularios: 'EmpresasTieneFormularios'
        }
    },
    Repository:     {
        OAuth: {
            OAuthRepository: 'OAuthRepository'
        },
        User: {
            UserRepository: 'UserRepository'
        },
        Administrador: {
            AdministradorRepository: 'AdministradorRepository'
        }
    },
    Service:     {
        OAuth: {
            OAuthService: 'OAuthService'
        },
        User: {
            UserService: 'UserService'
        },
        Administrador: {
            AdministradorService: 'AdministradorService'
        }
    },
    Middleware:     {
        OAuthMiddleware: 'OAuthMiddleware',
        TokenExtractorMiddleware: 'TokenExtractorMiddleware'
    },
    Listener:     {
        user: {
            UserAuthenticatedListener: 'UserAuthenticatedListener',
            UserCreatedListener: 'UserCreatedListener'
        }
    },
    Controller:     {
        OAuth: {
            OAuthController: 'OAuthController'
        },
        User: {
            UserController: 'UserController'
        },
        Empresa: {
            EmpresaController: 'EmpresaController'
        },
        Administrador: {
            AdministradorController: 'AdministradorController'
        }
    }
};
