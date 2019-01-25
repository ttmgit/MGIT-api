import * as _ from 'lodash';
import { Preguntas } from '../models/Preguntas/Preguntas';

export class Analizador {
    private tokens: any[];
    constructor() {
        this.tokens = [{
            expresionRegular: /^[A-Za-z][A-Za-z0-9]{0,10}/,
            token: 'VAR'
        }, {
            expresionRegular: /^[0-9]+/,
            token: 'NUM'
        }, {
            expresionRegular: /^\+/,
            token: 'SUM'
        }, {
            expresionRegular: /^\-/,
            token: 'RES'
        }, {
            expresionRegular: /^\//,
            token: 'DIV'
        }, {
            expresionRegular: /^\*/,
            token: 'MUL'
        }, {
            expresionRegular: /^\(/,
            token: 'PAI'
        }, {
            expresionRegular: /^\)/,
            token: 'PAD'
        }];
    }

    public sustituirAliasPorIds(cadena: string, preguntas: Preguntas[]): string {
        cadena = this.eliminarEspacios(cadena);
        cadena = this.recorreCadena(cadena, preguntas);
        return cadena;
    }

    private eliminarEspacios(cadena: string): string {
        return cadena.replace(/\s/g, '');
    }

    private getToken(cadena: string): any {
        let respuesta;
        let matchCadena;
        this.tokens.forEach((itemToken: any) => {
            matchCadena = cadena.match(itemToken.expresionRegular);
            if (matchCadena != null) {
                respuesta = {
                    token: itemToken.token,
                    subcadena: matchCadena[0],
                    cadenaRestante: cadena.substring(matchCadena[0].length, cadena.length)
                };
            }
        });
        return respuesta;
    }

    private recorreCadena(cadenaOriginal: string, preguntas: Preguntas[]): string {
        let cadenaRestante: string;
        let cadenaResultado: string;
        let resultadoToken: any;
        let preguntaASustituir: any;
        let nuevoAliasId: string;
        cadenaRestante = cadenaOriginal;
        cadenaResultado = '';
        do {
            resultadoToken = this.getToken(cadenaRestante);
            if (resultadoToken != null) {
                cadenaRestante = resultadoToken.cadenaRestante;
                if (resultadoToken.token === 'VAR') {
                    // Buscar subcadena en los alias
                    preguntaASustituir = _.find(preguntas, { Alias: resultadoToken.subcadena });
                    if (preguntaASustituir == null) {
                        cadenaRestante = '';
                        return '';
                    }
                    // Cambiar prefijo del id de la pregunta
                    nuevoAliasId = 'ID' + preguntaASustituir.Id;
                    // Escribir nuevo valor
                    cadenaResultado += nuevoAliasId;
                } else {
                    // Escribe cadena exactemente igual
                    cadenaResultado += resultadoToken.subcadena;
                }
            } else {
                cadenaRestante = '';
                return '';
            }
        } while (cadenaRestante !== '');
        return cadenaResultado;
    }
}
