import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../core/Logger';
import { Types, Core } from '../../constants';
import { Targets } from '../../constants/Targets';
import { OAuthService } from '../services/OAuth/OAuthService';
import { Usuarios } from '../models/Usuarios/Usuarios';
import { OAuthAccessToken } from '../models/OAuth/OAuthAccessToken';



export class TokenExtractorMiddleware implements interfaces.Middleware {

    public log: LoggerType;
    private readonly AUTHORIZATON_HEADER: string = 'authorization';
    private readonly BEARER_PREFIX: string = 'Bearer ';

    constructor(
        @inject(Types.Service) @named(Targets.Service.OAuth.OAuthService) private oAuthService: OAuthService,
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    /**
     * @description Finds the user that belongs to an OAuth Token and inserts it into the request.user property
     * @param {myExpress.Request} req
     * @param {myExpress.Response} res
     * @param {myExpress.NextFunction} next
     */
    public use = async (req: myExpress.Request, res: myExpress.Response, next: myExpress.NextFunction): Promise<any> => {
        let token: string = req.headers[this.AUTHORIZATON_HEADER].toString();
        token = token.replace(this.BEARER_PREFIX, '');
        const oAuthToken: OAuthAccessToken = await this.oAuthService.getAccessToken(token);
        req.usuario = oAuthToken.related('user') as Usuarios;
        if (req.usuario) {
            req.usuario.Password = '';
        }
        next();
    }

}
