/**
 * ValidationException
 * ----------------------------------------
 *
 * This should be used when we validate
 * the request payload, so we can response with a 400 (Bad Request)
 */

import { Exception } from '../../core/api/Exception';


export class BatchValidationException extends Exception {
    constructor(text: string, errors: any) {
        let info = errors.map((error, index) => {
            if (error.length === 0) {
                return null;
            }
            return error.map((e) => {
                return {
                    index,
                    property: e.property,
                    constraints: e.constraints
                };
            });
        });
        info = info.filter((element) => element !== null);
        super(400, text, info);
    }
}
