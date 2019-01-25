import { Exception } from '../../core/api/Exception';


export class OAuthException extends Exception {
    constructor(body: string) {
        super(503, body || null);
    }
}
