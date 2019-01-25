import { inject, named } from 'inversify';
import { Targets } from '../../../constants/Targets';
import { Types } from '../../../constants/Types';
import { Usuarios } from '../../models/Usuarios/Usuarios';

export class UserRepository {

    constructor(
        @inject(Types.Model) @named(Targets.Model.Usuarios.Usuarios) public UserModel: typeof Usuarios) {
    }

}
