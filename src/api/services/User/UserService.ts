import { Core, Types } from '../../../constants';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';


export class UserService {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

}
