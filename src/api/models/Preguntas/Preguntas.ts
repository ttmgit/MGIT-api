import { Bookshelf } from '../../../config/Database';

export class Preguntas extends Bookshelf.Model<Preguntas> {

    public static async fetchById(value: number): Promise<Preguntas> {
        return await Preguntas.where<Preguntas>({ id: value }).fetch();
    }

    public get tableName(): string { return 'preguntas'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get NombrePregunta(): string { return this.get('nombre_pregunta'); }
    public set NombrePregunta(value: string) { this.set('nombre_pregunta', value); }

    public get IdTipoDato(): number { return this.get('id_tipo_dato'); }
    public set IdTipoDato(value: number) { this.set('id_tipo_dato', value); }

    public get IdFormulario(): number { return this.get('id_formulario'); }
    public set IdFormulario(value: number) { this.set('id_formulario', value); }

    public get Alias(): string { return this.get('alias'); }
    public set Alias(value: string) { this.set('alias', value); }

}
