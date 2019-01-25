import { inject, named } from 'inversify';
import { Targets, Types } from '../../../constants';
import { Formularios } from '../../models/Formularios/Formularios';
import { Preguntas } from '../../models/Preguntas/Preguntas';
import { DatabaseException } from '../../exceptions/DatabaseException';
import { Indicadores } from '../../models/Indicadores/Indicadores';
import { EmpresasTieneFormularios } from '../../models/EmpresasTieneFormularios/EmpresasTieneFormularios';

export class AdministradorRepository {

    constructor(
        @inject(Types.Model) @named(Targets.Model.Formularios.Formularios) public FormulariosModel: typeof Formularios,
        @inject(Types.Model) @named(Targets.Model.Preguntas.Preguntas) public PreguntasModel: typeof Preguntas,
        @inject(Types.Model) @named(Targets.Model.Indicadores.Indicadores) public IndicadoresModel: typeof Indicadores,
        @inject(Types.Model) @named(Targets.Model.EmpresasTieneFormularios.EmpresasTieneFormularios)
        public empresasTieneFormulariosModel: typeof EmpresasTieneFormularios
    ) { }

    public async insertarFormulario(formulario: any): Promise<Formularios> {
        const formularioModelo = this.FormulariosModel.forge<Formularios>(formulario);
        try {
            const formularioCreado = await formularioModelo.save();
            return this.FormulariosModel.fetchById(formularioCreado.id);
        } catch (error) {
            throw new DatabaseException('No se pudo insertar el formulario', error);
        }
    }

    public async insertarPregunta(pregunta: any): Promise<Preguntas> {
        const preguntaModelo = this.PreguntasModel.forge<Preguntas>(pregunta);
        try {
            const preguntaCreada = await preguntaModelo.save();
            return this.PreguntasModel.fetchById(preguntaCreada.id);
        } catch (error) {
            throw new DatabaseException('No se pudo insertar la pregunta', error);
        }
    }

    public async insertarIndicador(indicador: any): Promise<Indicadores> {
        const indicadorModelo = this.IndicadoresModel.forge<Indicadores>(indicador);
        try {
            const indicadorCreado = await indicadorModelo.save();
            return this.IndicadoresModel.fetchById(indicadorCreado.id);
        } catch (error) {
            throw new DatabaseException('No se pudo insertar el indicador', error);
        }
    }

    public async insertarEmpresasTieneFormularios(empresaFormulario: any): Promise<EmpresasTieneFormularios> {
        const empresaFormularioModelo = this.empresasTieneFormulariosModel.forge<EmpresasTieneFormularios>(empresaFormulario);
        try {
            const creado = await empresaFormularioModelo.save();
            return creado;
        } catch (error) {
            throw new DatabaseException('No se pudo insertar empresa tiene formularios', error);
        }
    }

}
