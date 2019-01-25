import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';


export class OAuthRevokeTokenRequest extends RequestBody {

    @IsNotEmpty()
    public token: string;

}

