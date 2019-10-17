import { inject, named } from 'inversify';
import { Targets } from '../../../constants/Targets';
import { Types } from '../../../constants/Types';
import { Empresas } from '../../models/Empresas/Empresas';
import { DatabaseException } from '../../exceptions/DatabaseException';

export class EmpresaRepository {

    constructor(
        @inject(Types.Model) @named(Targets.Model.Empresas.Empresas) public EmpresaModel: typeof Empresas) {
    }

    public async crearEmpresa(empresa: any): Promise<Empresas> {
        const empresaModel = this.EmpresaModel.forge<Empresas>(empresa);
        try {
            const empresaCreada = await empresaModel.save();
            return this.EmpresaModel.fetchById(empresaCreada.id);
        } catch (error) {
            throw new DatabaseException('No se pudo insertar la empresa', error);
        }
    }

}
