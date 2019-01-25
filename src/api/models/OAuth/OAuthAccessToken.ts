import { Bookshelf } from '../../../config/Database';
import { OAuthClient } from './OAuthClient';
import { Usuarios } from '../Usuarios/Usuarios';


export class OAuthAccessToken extends Bookshelf.Model<OAuthAccessToken> {

    public static readonly RELATED_PROPERTY_USER = 'user';

    public static async revokePreviousTokens(user: Usuarios): Promise<any> {
        const collection = await OAuthAccessToken.where<OAuthAccessToken>({ user_id: user.Id }).fetchAll();
        return collection.invokeThen('destroy');
    }

    public static async fetchById(value: number): Promise<OAuthAccessToken> {
        return await OAuthAccessToken.where<OAuthAccessToken>({ id: value }).fetch();
    }

    public static async fetchByToken(token: string): Promise<OAuthAccessToken> {
        return await OAuthAccessToken.where<OAuthAccessToken>({ access_token: token })
            .fetch({
                withRelated: [
                    this.RELATED_PROPERTY_USER]
            });
    }

    public get tableName(): string { return 'oauth_access_token'; }
    public get hasTimestamps(): boolean { return false; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get accessToken(): string { return this.get('access_token'); }
    public set accessToken(value: string) { this.set('access_token', value); }

    public get accessTokenExpiresAt(): Date { return this.get('expires'); }
    public set accessTokenExpiresAt(value: Date) { this.set('expires', value); }

    public get scope(): string { return this.get('scope'); }
    public set scope(value: string) { this.set('scope', value); }

    public get clientId(): number { return this.get('client_id'); }
    public set clientId(value: number) { this.set('client_id', value); }

    public get userId(): number { return this.get('user_id'); }
    public set userId(value: number) { this.set('user_id', value); }

    public client = (): OAuthClient => {
        return this.belongsTo(OAuthClient, 'client_id');
    }

    public user = (): Usuarios => {
        return this.belongsTo(Usuarios, 'user_id');
    }

}
