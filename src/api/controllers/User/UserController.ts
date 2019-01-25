import { app } from '../../../app';
import {
    controller,
    httpGet,
    request,
    requestBody,
    response,
    httpPut
    } from 'inversify-express-utils';
import { inject, named } from 'inversify';
import { OAuthMiddleware } from '../../middlewares/OAuthMiddleware';
import { Targets, Types } from '../../../constants';
import { TokenExtractorMiddleware } from '../../middlewares/TokenExtractorMiddleware';
import { UserService } from '../../services/User/UserService';

const OAuth = app.IoC.getNamed<OAuthMiddleware>(Types.Middleware, Targets.Middleware.OAuthMiddleware);
const tokenExtractor = app.IoC.getNamed<TokenExtractorMiddleware>(Types.Middleware, Targets.Middleware.TokenExtractorMiddleware);

@controller('/users', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
export class UserController {

    constructor(@inject(Types.Service) @named(Targets.Service.User.UserService) public userService: UserService) {
    }

    @httpGet('/info')
    public async userInfo(@requestBody() body: any, @request() req: myExpress.Request,
                          @response() res: myExpress.Response): Promise<any> {
        return res.updated(req.usuario);
    }

    @httpPut('')
    public async actualizarCuenta(@requestBody() body: any, @request() req: myExpress.Request,
                                  @response() res: myExpress.Response): Promise<any> {
        console.log(body);
        return res.ok({});
    }

}
