/**
 * core.api.extendExpressResponse
 * ------------------------------------------------
 *
 * We use this middleware to extend the express response object, so
 * we can access the new functionality in our controllers. The extension
 * should simplify common responses.
 */

import * as express from 'express';


export const extendExpressResponse = (req: myExpress.Request, res: myExpress.Response, next: express.NextFunction) => {

    /**
     * 200 - OK
     * This is used for successful responses and a json body
     */
    res.ok = <T>(data: T, options: myExpress.ResponseOptions = {}) => {
        res.status(200);
        return res.json(bodySuccessful(data, options));
    };

    /**
     * 201 - Created
     * This is used for created resources
     */
    res.created = <T>(data: T, options: myExpress.ResponseOptions = {}) => {
        res.status(201);
        return res.json(bodySuccessful(data, options));
    };

    /**
     * 200 - Found
     * Like the ok function
     */
    res.found = <T>(data: T, options: myExpress.ResponseOptions = {}) => {
        return res.ok(data, options);
    };

    /**
     * 200 - Updated
     * Like the ok function
     */
    res.updated = <T>(data: T, options: myExpress.ResponseOptions = {}) => {
        return res.ok(data, options);
    };

    /**
     * 200 - Destroyed
     * This is the response after a resource has been removed
     */
    res.destroyed = (options: myExpress.ResponseOptions = {}) => {
        res.status(200);
        return res.json(bodySuccessful(null));
    };

    /**
     * 400-500 - Failed
     * This is used when a request has failed
     */
    res.failed = (status: number, message: string, error?: any) => {
        res.status(status);
        return res.json(bodyFailed(message, error));
    };

    next();
};


/**
 * This body parser is used to show successful responses to the client
 */
export function bodySuccessful<T>(data: T, options: myExpress.ResponseOptions = {}): any {
    return data;
}

/**
 * This body parse is used for error messages to the client
 */
export function bodyFailed(message: string, error?: any): any {
    return {
        message,
        ...{ error }
    };
}

