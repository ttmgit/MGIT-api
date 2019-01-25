import { Exception } from '../../core/api/Exception';


export class BusinessLogicException extends Exception {
    constructor(text: string, error: any) {
        super(409, text, error);
    }
}
