import { app } from '../../../app';
import {
    controller,
    requestBody,
    response,
    httpPost
    } from 'inversify-express-utils';
import { OAuthMiddleware } from '../../middlewares/OAuthMiddleware';
import { Targets, Types } from '../../../constants';
import { TokenExtractorMiddleware } from '../../middlewares/TokenExtractorMiddleware';
import { AdministradorService } from '../../services/Administrador/AdministradorService';
import { inject, named } from 'inversify';

const OAuth = app.IoC.getNamed<OAuthMiddleware>(Types.Middleware, Targets.Middleware.OAuthMiddleware);
const tokenExtractor = app.IoC.getNamed<TokenExtractorMiddleware>(Types.Middleware, Targets.Middleware.TokenExtractorMiddleware);

@controller('/administrador')
export class AdministradorController {

    constructor(
        @inject(Types.Service) @named(Targets.Service.Administrador.AdministradorService) public administradorService: AdministradorService) { }
        @httpPost('/formulario', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
    public async crearEmpresa(@requestBody() body: any,
                              @response() res: myExpress.Response): Promise<any> {
        return this.administradorService.crearFormulario(body);
    }

}
