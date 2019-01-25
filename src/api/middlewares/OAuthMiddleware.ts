import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../core/Logger';
import { Types, Core } from '../../constants';
import * as OAuthExpressServer from 'express-oauth-server';
import { OAuthService } from '../services/OAuth/OAuthService';
import { Targets } from '../../constants/Targets';


export class OAuthMiddleware {
    public log: LoggerType;
    public oAuthExpressServer: OAuthExpressServer;
    constructor(
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType,
        @inject(Types.Service) @named(Targets.Service.OAuth.OAuthService) public oAuthService: OAuthService
    ) {
        this.oAuthExpressServer = new OAuthExpressServer({
            model: this.oAuthService,
            useErrorHandler: false,
            continueMiddleware: false
        });
        this.log = new Logger(__filename);
    }



}
