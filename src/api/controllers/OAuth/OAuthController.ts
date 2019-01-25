import { controller, httpPost, request, requestBody, response } from 'inversify-express-utils';
import { Types, Targets } from '../../../constants';
import { inject, named } from 'inversify';
import { OAuthService } from '../../services/OAuth/OAuthService';
import { OAuthMiddleware } from '../../middlewares/OAuthMiddleware';
import { app } from '../../../app';
import { TokenExtractorMiddleware } from '../../middlewares/TokenExtractorMiddleware';

const tokenMiddleware = app.IoC.getNamed<OAuthMiddleware>(Types.Middleware, Targets.Middleware.OAuthMiddleware);
const OAuth = app.IoC.getNamed<OAuthMiddleware>(Types.Middleware, Targets.Middleware.OAuthMiddleware);
const tokenExtractor = app.IoC.getNamed<TokenExtractorMiddleware>(Types.Middleware, Targets.Middleware.TokenExtractorMiddleware);

@controller('/oauth')
export class OAuthController {

    constructor(@inject(Types.Service) @named(Targets.Service.OAuth.OAuthService) public oauth: OAuthService) {
    }

    /**
     * @swagger
     * securityDefinitions:
     *     oauth_2_resource_owner_auth:
     *        description: OAuth Endpoints, contact your admin for a client id and secret
     *        flow: password
     *        type: oauth2
     *        tokenUrl: /api/oauth
     *        refreshUrl: /api/oauth
     */
    @httpPost('/', tokenMiddleware.oAuthExpressServer.token())
    public async getClient(@response() res: myExpress.Response, @requestBody() body: any): Promise<any> {
        return res.ok({});
    }

    @httpPost('/revoke', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use )
    public async revokeToken(@response() res: myExpress.Response,  @request() req: myExpress.Request, @requestBody() body: any): Promise<any> {
        await this.oauth.revokeTokenHandler(body, req.usuario);
        return res.ok({});
    }

    @httpPost('/validate', OAuth.oAuthExpressServer.authenticate())
    public async validateToken(@response() res: myExpress.Response,  @request() req: myExpress.Request, @requestBody() body: any): Promise<any> {
        return res.ok({});
    }
}
