import { Bookshelf } from '../../../config/Database';

export class Roles extends Bookshelf.Model<Roles> {

    public static async fetchById(value: number): Promise<Roles> {
        return await Roles.where<Roles>({ id: value }).fetch();
    }

    public get tableName(): string { return 'roles'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get Name(): string { return this.get('descripcion'); }
    public set Name(value: string) { this.set('descripcion', value); }

}
