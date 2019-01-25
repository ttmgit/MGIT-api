import { Exception } from '../../core/api/Exception';


export class OAuthUnauthorizedException extends Exception {
    constructor() {
        super(400, 'The authorization grant type is not supported by the authorization server.', 'unauthorized_client');
    }
}
