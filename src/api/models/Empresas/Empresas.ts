import { Bookshelf } from '../../../config/Database';

export class Empresas extends Bookshelf.Model<Empresas> {

    public static async fetchById(value: number): Promise<Empresas> {
        return await Empresas.where<Empresas>({ id: value }).fetch();
    }

    public get tableName(): string { return 'empresas'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get NombreEmpresa(): string { return this.get('nombre_empresa'); }
    public set NombreEmpresa(value: string) { this.set('nombre_empresa', value); }

    public get NombreEncargado(): string { return this.get('nombre_encargado'); }
    public set NombreEncargado(value: string) { this.set('nombre_encargado', value); }

    public get CargoRepresentante(): string { return this.get('cargo_representante'); }
    public set CargoRepresentante(value: string) { this.set('cargo_representante', value); }

    public get IdTamanio(): number { return this.get('id_tamanio'); }
    public set IdTamanio(value: number) { this.set('id_tamanio', value); }

    public get IdUsuario(): number { return this.get('id_usuario'); }
    public set IdUsuario(value: number) { this.set('id_usuario', value); }

    public get IdSector(): number { return this.get('id_sector'); }
    public set IdSector(value: number) { this.set('id_sector', value); }

    public get SectorEspecifico(): string { return this.get('sector_especifico'); }
    public set SectorEspecifico(value: string) { this.set('sector_especifico', value); }

}
