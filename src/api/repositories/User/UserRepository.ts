import { inject, named } from 'inversify';
import { Targets } from '../../../constants/Targets';
import { Types } from '../../../constants/Types';
import { Usuarios } from '../../models/Usuarios/Usuarios';
import { DatabaseException } from '../../exceptions/DatabaseException';

export class UserRepository {

    constructor(
        @inject(Types.Model) @named(Targets.Model.Usuarios.Usuarios) public UserModel: typeof Usuarios) {
    }

    public async crearUsuario(usuario: any): Promise<Usuarios> {
        const usuarioModel = this.UserModel.forge<Usuarios>(usuario);
        try {
            const usuarioCreado = await usuarioModel.save();
            return this.UserModel.fetchById(usuarioCreado.id);
        } catch (error) {
            throw new DatabaseException('No se pudo insertar el usuario', error);
        }
    }

}
