import { app } from '../../../app';
import {
    controller,
    httpGet,
    request,
    requestBody,
    response,
    httpPost,
    httpPut
    } from 'inversify-express-utils';
import { OAuthMiddleware } from '../../middlewares/OAuthMiddleware';
import { Targets, Types } from '../../../constants';
import { TokenExtractorMiddleware } from '../../middlewares/TokenExtractorMiddleware';
import { EmpresaService } from '../../services/Empresa/EmpresaService';
import { inject, named } from 'inversify';

const OAuth = app.IoC.getNamed<OAuthMiddleware>(Types.Middleware, Targets.Middleware.OAuthMiddleware);
const tokenExtractor = app.IoC.getNamed<TokenExtractorMiddleware>(Types.Middleware, Targets.Middleware.TokenExtractorMiddleware);

@controller('/empresa')
export class EmpresaController {

    constructor(@inject(Types.Service) @named(Targets.Service.Empresa.EmpresaService) public empresaService: EmpresaService) {
        }
    @httpGet('/menus', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
    public async menus(@requestBody() body: any, @request() req: myExpress.Request,
                       @response() res: myExpress.Response): Promise<any> {
        return res.ok([{id: 1, nombre_formulario: 'Formulario 1'},
        {id: 2, nombre_formulario: 'Formulario 2'}]);
    }

    @httpGet('/reporte/formulario/:id', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
    public async reporte(@requestBody() body: any, @request() req: myExpress.Request,
                         @response() res: myExpress.Response): Promise<any> {
        return res.ok([
            {id: 1, nombre_indicador: 'Indicador 1', valor: 5, tipo_valor: 1, valor_de_referencia: 5, comparativa: 1},
            {id: 2, nombre_indicador: 'Indicador 2', valor: 5, tipo_valor: 1, valor_de_referencia: 5, comparativa: 1}]);
    }

    @httpGet('/formulario/:id', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
    public async traerFormulario(@requestBody() body: any, @request() req: myExpress.Request,
                                 @response() res: myExpress.Response): Promise<any> {
        return res.ok([
            {id: 1, nombre_pregunta: 'Pregunta 1', valor: 5, tipo_dato: 1},
            {id: 2, nombre_pregunta: 'Pregunta 2', valor: 5, tipo_dato: 1}]);
    }

    @httpPut('/formulario/:id', OAuth.oAuthExpressServer.authenticate(), tokenExtractor.use)
    public async putFormulario(@requestBody() body: any, @request() req: myExpress.Request,
                               @response() res: myExpress.Response): Promise<any> {
        console.log(body);
        return res.ok({});
    }

    @httpPost('')
    public async crearEmpresa(@requestBody() body: any,
                              @response() res: myExpress.Response): Promise<any> {
        return this.empresaService.crearUsuario(body);
    }

    @httpGet('/sector')
    public async traerSectores(): Promise<any> {
        return null;
    }

    @httpGet('/tamanio')
    public async traerTamaniosEmpresa(): Promise<any> {
        return null;
    }

}
