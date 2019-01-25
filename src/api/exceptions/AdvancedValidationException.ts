/**
 * ValidationException
 * ----------------------------------------
 *
 * This should be used when we validate
 * the request payload, so we can response with a 400 (Bad Request)
 */

import { Exception } from '../../core/api/Exception';

/**
 * @description This validation exception deals with complex objects
 * as well as plain objects
 */
export class AdvancedValidationException extends Exception {
    constructor(text: string, errors: any) {
        const info = errors.map((e) => ({
            property: e.property,
            constraints: e.constraints,
            children: e.children
        }));
        super(400, text, info);
    }
}
