import { Bookshelf } from '../../../config/Database';

export class Formularios extends Bookshelf.Model<Formularios> {

    public static async fetchById(value: number): Promise<Formularios> {
        return await Formularios.where<Formularios>({ id: value }).fetch();
    }

    public get tableName(): string { return 'formularios'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get NombreFormulario(): string { return this.get('nombre_formulario'); }
    public set NombreFormulario(value: string) { this.set('nombre_formulario', value); }

}
