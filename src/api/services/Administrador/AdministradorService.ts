import { Core, Types, Targets } from '../../../constants';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';
import { AdministradorRepository } from '../../repositories/Administrador/AdministradorRepository';
import { Formularios } from '../../models/Formularios/Formularios';
import { Preguntas } from '../../models/Preguntas/Preguntas';
import { Analizador } from '../../shared/Analizador';
import { Indicadores } from '../../models/Indicadores/Indicadores';

export class AdministradorService {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType,
        @inject(Types.Repository) @named(Targets.Repository.Administrador.AdministradorRepository) private administradorRepository: AdministradorRepository
    ) {
        this.log = new Logger(__filename);
    }

    public crearFormulario(body: any): Promise <any> {
        let respuesta: Promise<any>;
        respuesta = new Promise((resolve, reject) => {
            this.administradorRepository.insertarFormulario(body.formulario).then((formulario: Formularios) => {
                let promesasPreguntas: Array<Promise<Preguntas>>;
                promesasPreguntas = [];
                body.preguntas.forEach( pregunta => {
                    let preguntaInsertar;
                    preguntaInsertar = {
                        NombrePregunta: pregunta.pregunta,
                        IdTipoDato: Number(pregunta.tipo),
                        IdFormulario: Number(formulario.Id),
                        Alias: pregunta.alias
                    };
                    promesasPreguntas.push(this.administradorRepository.insertarPregunta(preguntaInsertar));
                });
                Promise.all(promesasPreguntas).then((preguntasInsertadas: Preguntas[]) => {
                    let analizador: Analizador;
                    let promesasIndicadores: Array<Promise<Indicadores>>;
                    analizador = new Analizador();
                    promesasIndicadores = [];
                    body.indicadores.forEach((indicador) => {
                        const indicadorInsertar = {
                            NombreIndicador: indicador.nombre,
                            Operacion: analizador.sustituirAliasPorIds(indicador.operacion, preguntasInsertadas),
                            ValorDeReferencia: indicador.referencia,
                            Comparativa: indicador.comparativa,
                            IdFormulario: Number(formulario.Id)
                        };
                        promesasIndicadores.push(this.administradorRepository.insertarIndicador(indicadorInsertar));
                    });
                    Promise.all(promesasIndicadores).then(() => {
                        if (body.aplicaTodasEmpresas) {
                            const empresaFormulario = {
                                IdEmpresa: null,
                                IdFormulario: Number(formulario.id)
                            };
                            this.administradorRepository.insertarEmpresasTieneFormularios(empresaFormulario).then(() => {
                                resolve(body);
                            }).catch((error) => {
                                reject(error);
                            });
                        } else {
                            resolve(body);
                        }
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
        return respuesta;
    }

}
