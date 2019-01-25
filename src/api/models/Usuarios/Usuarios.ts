import { Bookshelf } from '../../../config/Database';
import { Roles } from '../Roles/Roles';


export class Usuarios extends Bookshelf.Model<Usuarios> {

    public static readonly RELATED_PROPERTY_ROLES = 'roles';

    public static async fetchById(userId: number): Promise<Usuarios> {
        return await Usuarios.where<Usuarios>({ id: userId }).fetch();
    }

    public static async fetchByUsernameAndPassword(user: string, passwordValue: string): Promise<Usuarios> {
        return await Usuarios.where<Usuarios>({ correo: user, password: passwordValue }).fetch();
    }

    public get tableName(): string {
        return 'usuarios';
    }

    public get hasTimestamps(): boolean {
        return false;
    }

    public get Id(): number {
        return this.get('id');
    }

    public set Id(value: number) {
        this.set('id', value);
    }

    public get IdRol(): number {
        return this.get('id_rol');
    }

    public set IdRol(value: number) {
        this.set('id_rol', value);
    }

    public get Correo(): string {
        return this.get('correo');
    }

    public set Correo(value: string) {
        this.set('correo', value);
    }

    public get Password(): string {
        return this.get('password');
    }

    public set Password(value: string) {
        this.set('password', value);
    }

    public get EstaActivo(): boolean {
        return this.get('esta_activo');
    }

    public set EstaActivo(value: boolean) {
        this.set('esta_activo', value);
    }

    public get Creado(): Date {
        return this.get('creado');
    }

    public set Creado(value: Date) {
        this.set('creado', value);
    }

    public get Actualizado(): Date {
        return this.get('actualizado');
    }

    public set Actualizado(value: Date) {
        this.set('actualizado', value);
    }

    public roles = (): Roles => {
        return this.belongsTo(Roles, 'id');
    }

}
