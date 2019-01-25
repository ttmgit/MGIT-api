import { Exception } from '../../core/api/Exception';


export class OAuthAccessTokenNotFoundException extends Exception {
    constructor() {
        super(401, 'OAuth Access Token Not Found');
    }
}
