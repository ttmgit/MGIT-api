import { Bookshelf } from '../../../config/Database';

export class Indicadores extends Bookshelf.Model<Indicadores> {

    public static async fetchById(value: number): Promise<Indicadores> {
        return await Indicadores.where<Indicadores>({ id: value }).fetch();
    }

    public get tableName(): string { return 'indicadores'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get NombreIndicador(): string { return this.get('nombre_indicador'); }
    public set NombreIndicador(value: string) { this.set('nombre_indicador', value); }

    public get Operacion(): string { return this.get('operacion'); }
    public set Operacion(value: string) { this.set('operacion', value); }

    public get ValorDeReferencia(): string { return this.get('valor_de_referencia'); }
    public set ValorDeReferencia(value: string) { this.set('valor_de_referencia', value); }

    public get Comparativa(): boolean { return this.get('comparativa'); }
    public set Comparativa(value: boolean) { this.set('comparativa', value); }

    public get IdFormulario(): number { return this.get('id_formulario'); }
    public set IdFormulario(value: number) { this.set('id_formulario', value); }

}
