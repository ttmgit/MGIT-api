import { Bookshelf } from '../../../config/Database';

export class EmpresasTieneFormularios extends Bookshelf.Model<EmpresasTieneFormularios> {

    public get tableName(): string { return 'empresas_tienen_formularios'; }
    public get hasTimestamps(): boolean { return false; }

    public get IdEmpresa(): string { return this.get('id_empresa'); }
    public set IdEmpresa(value: string) { this.set('id_empresa', value); }

    public get IdFormulario(): number { return this.get('id_formulario'); }
    public set IdFormulario(value: number) { this.set('id_formulario', value); }

}
