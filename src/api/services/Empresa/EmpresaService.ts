import { Core, Types, Targets } from '../../../constants';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';
import { UserRepository } from '../../repositories/User/UserRepository';
import { EmpresaRepository } from '../../repositories/Empresa/EmpresaRepository';

export class EmpresaService {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType,
        @inject(Types.Repository) @named(Targets.Repository.User.UserRepository) private userRepository: UserRepository,
        @inject(Types.Repository) @named(Targets.Repository.Empresa.EmpresaRepository) private empresaRepository: EmpresaRepository
    ) {
        this.log = new Logger(__filename);
    }

    public crearUsuario(body: any): Promise<any> {
        let respuesta: Promise<any>;
        const usuario = {
            IdRol: 2,
            Correo: body.correo,
            Password: body.password
        };
        respuesta = new Promise((resolve, reject) => {
            this.userRepository.crearUsuario(usuario).then((usuarioCreado) => {
                const empresa = {
                    NombreEmpresa: body.nombreEmpresa,
                    NombreEncargado: body.nombreRepresentante,
                    CargoRepresentante: body.cargoRepresentante,
                    IdTamanio: body.tamanio,
                    IdSector: body.sector,
                    IdUsuario: usuarioCreado.id,
                    SectorEspecifico: body.subSector
                };
                this.empresaRepository.crearEmpresa(empresa).then(() => {
                    resolve(body);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
        return respuesta;
    }
}
