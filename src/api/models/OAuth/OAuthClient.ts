import { Bookshelf } from '../../../config/Database';
import { Usuarios } from '../Usuarios/Usuarios';


export class OAuthClient extends Bookshelf.Model<OAuthClient> {

    public static async fetchById(value: number): Promise<OAuthClient> {
        return await OAuthClient.where<OAuthClient>({ id: value }).fetch();
    }

    public static async fetchByIdAndSecret(clientId: string, secret: string): Promise<OAuthClient> {
        return await OAuthClient.where<OAuthClient>({ client_id: clientId, client_secret: secret }).fetch();
    }

    public get tableName(): string {
        return 'oauth_client';
    }

    public get hasTimestamps(): boolean {
        return true;
    }

    public get Id(): number {
        return this.get('id');
    }

    public set Id(value: number) {
        this.set('id', value);
    }

    public get Name(): string {
        return this.get('name');
    }

    public set Name(value: string) {
        this.set('name', value);
    }

    public get ClientId(): string {
        return this.get('client_id');
    }

    public set ClientId(value: string) {
        this.set('client_id', value);
    }

    public get ClientSecret(): string {
        return this.get('client_secret');
    }

    public set ClientSecret(value: string) {
        this.set('client_secret', value);
    }

    public get RedirectUri(): string {
        return this.get('redirect_uri');
    }

    public set RedirectUri(value: string) {
        this.set('redirect_uri', value);
    }

    public get GrantTypes(): string {
        return this.get('grant_types');
    }

    public set GrantTypes(value: string) {
        this.set('grant_types', value);
    }

    public get grants(): string[] {
        return JSON.parse(this.attributes.grantTypes);
    }

    public get Scope(): string {
        return this.get('scope');
    }

    public set Scope(value: string) {
        this.set('scope', value);
    }

    public get UserId(): number {
        return this.get('user_id');
    }

    public set UserId(value: number) {
        this.set('user_id', value);
    }

    public user(): Usuarios {
        return this.belongsTo(Usuarios, 'user_id');
    }
}
