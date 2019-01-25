/**
 * core.api.RequestBody
 * ------------------------------------------------
 *
 * This class is used to verify a valid payload an prepare
 * it for further actions in the services. To validate we
 * use the module 'class-validator'.
 *
 * If you want to skip missing properties just override the
 * validate method in your extended request class.
 */

import 'reflect-metadata';
import { validate } from 'class-validator';
import { ValidationException } from '../../api/exceptions/ValidationException';
import { ClassType, transformAndValidate, TransformValdiationOptions } from 'class-transformer-validator';
import { BatchValidationException } from '../../api/exceptions/BatchValidationException';
import { AdvancedValidationException } from '../../api/exceptions/AdvancedValidationException';


export class RequestBody {

    /**
     * Creates an instance of RequestBody and if a input is given
     * we store the values into the correct property
     */
    constructor(input?: any) {
        if (input) {
            const keys = Object.keys(input);
            keys.forEach((key) => {
                this[key] = input[key];
            });
        }
    }

    /**
     * Validates the body on the basis of the validator-annotations
     */
    public async validate(skipMissingProperties: boolean = false): Promise<void> {
        const errors = await validate(this, { skipMissingProperties });
        if (errors && errors.length > 0) {
            throw new ValidationException('Request body is not valid', errors);
        }
        return;
    }

    /**
     * Validates the body on the basis of the validator-annotations. Use this if you want to use an array-type
     * validation
     */
    public async batchValidate<T extends object>(skipMissingProperties: boolean = false, classReference: ClassType<T>): Promise<void> {
        try {
            const request = this;
            const options: TransformValdiationOptions = { validator: { skipMissingProperties }};
            await transformAndValidate(classReference, Object.values(request), options);
            return;
        } catch (errors) {
            throw new BatchValidationException('Request body is not valid', errors);
        }
    }
    /**
     * Validates the body on the basis of the validator-annotations. Use this if you want to use an array-type
     * validation
     */
    public async customObjectValidate<T extends object>(skipMissingProperties: boolean = false, classReference: ClassType<T>): Promise<void> {
        try {
            const request = this;
            const options: TransformValdiationOptions = { validator: { skipMissingProperties }, transformer: {enableCircularCheck: true}};
            await transformAndValidate(classReference, request, options);
            return;
        } catch (errors) {
            throw new AdvancedValidationException('Request body is not valid', errors);
        }
    }

}
