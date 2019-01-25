import { Exception } from '../../core/api/Exception';


export class OAuthClientNotFoundException extends Exception {
    constructor() {
        super(404, 'OAuth Client not found');
    }
}
