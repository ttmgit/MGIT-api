import { Bookshelf } from '../../../config/Database';
import { OAuthClient } from './OAuthClient';
import { Usuarios } from '../Usuarios/Usuarios';


export class OAuthRefreshToken extends Bookshelf.Model<OAuthRefreshToken> {

    public static async revokePreviousTokens(user: Usuarios): Promise<any> {
        const collection = await OAuthRefreshToken.where<OAuthRefreshToken>({user_id: user.Id}).fetchAll();
        return collection.invokeThen('destroy');
    }

    public static async fetchById(value: number): Promise<OAuthRefreshToken> {
        return await OAuthRefreshToken.where<OAuthRefreshToken>({ id: value }).fetch();
    }

    public static async fetchByRefreshToken(refreshToken: string): Promise<OAuthRefreshToken> {
        return await OAuthRefreshToken.where<OAuthRefreshToken>({ refresh_token: refreshToken })
            .fetch({ withRelated: ['oAuthClient', 'oAuthUser'] });

    }

    public get tableName(): string {
        return 'oauth_refresh_token';
    }

    public get hasTimestamps(): boolean {
        return false;
    }

    public get Id(): number {
        return this.get('id');
    }

    public set Id(value: number) {
        this.set('id', value);
    }

    public get refreshToken(): string {
        return this.get('refreshToken');
    }

    public set refreshToken(value: string) {
        this.set('refreshToken', value);
    }

    public get refreshTokenExpiresAt(): Date {
        return this.get('expires');
    }

    public set refreshTokenExpiresAt(value: Date) {
        this.set('expires', value);
    }

    public get scope(): string {
        return this.get('scope');
    }

    public set scope(value: string) {
        this.set('scope', value);
    }

    public get clientId(): number {
        return this.get('clientId');
    }

    public set clientId(value: number) {
        this.set('clientId', value);
    }

    public get userId(): number {
        return this.get('userId');
    }

    public set userId(value: number) {
        this.set('userId', value);
    }

    public set client(client: OAuthClient) {
        this.set('client', client);
    }

    public get client(): OAuthClient {
        return this.get('client');
    }

    public set user(user: Usuarios) {
        this.set('user', user);
    }

    public get user(): Usuarios {
        return this.get('user');
    }

    // Relationship with User
    public oAuthClient = (): OAuthClient => {
        return this.belongsTo(OAuthClient, 'client_id', 'id');
    }

    // Relationship with user
    public oAuthUser = (): Usuarios => {
        return this.belongsTo(Usuarios, 'user_id', 'id');
    }


}
