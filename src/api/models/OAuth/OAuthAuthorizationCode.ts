import { Bookshelf } from '../../../config/Database';
import { OAuthClient } from './OAuthClient';
import { Usuarios } from '../Usuarios/Usuarios';


export class OAuthAuthorizationCode extends Bookshelf.Model<OAuthAuthorizationCode> {

    public static async fetchById(value: number): Promise<OAuthAuthorizationCode> {
        return await OAuthAuthorizationCode.where<OAuthAuthorizationCode>({ id: value }).fetch();
    }

    public get tableName(): string { return 'oauth_authorization_code'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get code(): string { return this.get('authorization_code'); }
    public set code(value: string) { this.set('authorization_code', value); }

    public get expiresAt(): Date { return this.get('expires'); }
    public set expiresAt(value: Date) { this.set('expires', value); }

    public get redirectUri(): string { return this.get('redirect_uri'); }
    public set redirectUri(value: string) { this.set('redirect_uri', value); }

    public get scope(): string { return this.get('scope'); }
    public set scope(value: string) { this.set('scope', value); }

    public get clientId(): number { return this.get('client_id'); }
    public set clientId(value: number) { this.set('client_id', value); }

    public get userId(): number { return this.get('user_id'); }
    public set userId(value: number) { this.set('user_id', value); }

    public client(): OAuthClient {
        return this.belongsTo(OAuthClient, 'client_id');
    }
    public user(): Usuarios {
        return this.belongsTo(Usuarios, 'user_id');
    }
}
