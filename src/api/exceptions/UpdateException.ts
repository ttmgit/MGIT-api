import { Exception } from '../../core/api/Exception';


export class UpdateException extends Exception {
    public static readonly UPDATED = 'updated';
    public static readonly CONFIRMED = 'confirmed';
    constructor(className: string, verb: string, error?: any) {
        super(409, `${className} could not be ${verb}!`, error);
    }
}
