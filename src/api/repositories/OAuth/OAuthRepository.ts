// import { Knex } from '../../config/Database';
import { inject, named } from 'inversify';
import { Types, Targets } from '../../../constants';
import { OAuthClient } from '../../models/OAuth/OAuthClient';
import { OAuthAccessToken } from '../../models/OAuth/OAuthAccessToken';
import { OAuthRefreshToken } from '../../models/OAuth/OAuthRefreshToken';
import { OAuthGenericToken } from 'resources';
import { OAuthAuthorizationCode } from '../../models/OAuth/OAuthAuthorizationCode';
import { Usuarios } from '../../models/Usuarios/Usuarios';
import { OAuthException } from '../../exceptions/OAuthException';


export class OAuthRepository {

    constructor(@inject(Types.Model) @named(Targets.Model.OAuth.OAuthClient) public OAuthClientModel: typeof OAuthClient,
                @inject(Types.Model) @named(Targets.Model.OAuth.OAuthAccessToken) public OAuthAccessTokenModel: typeof OAuthAccessToken,
                @inject(Types.Model) @named(Targets.Model.OAuth.OAuthRefreshToken) public OAuthRefreshTokenModel: typeof OAuthRefreshToken,
                @inject(Types.Model) @named(Targets.Model.OAuth.OAuthAuthorizationCode) public OAuthAuthorizationCodeModel: typeof OAuthAuthorizationCode,
                @inject(Types.Model) @named(Targets.Model.Usuarios.Usuarios) public UsuariosModel: typeof Usuarios) {
    }

    /**
     * @description Retrieves an OAuth Client that matches the id and secret
     * @param {string} clientId - OAuth client id
     * @param {string} clientSecret - OAuth client secret
     * @returns {Promise<OauthClient>}
     */
    public async getOAuthClient(clientId: string, clientSecret: string): Promise<OAuthClient> {
        const client = await this.OAuthClientModel.fetchByIdAndSecret(clientId, clientSecret);
        return client;
    }

    public async getOAuthAccessToken(accessToken: string): Promise<OAuthAccessToken> {
        const token = await this.OAuthAccessTokenModel.fetchByToken(accessToken);
        return token;
    }

    public async getOAuthRefreshtoken(refreshToken: string): Promise<OAuthRefreshToken> {
        const token = await this.OAuthRefreshTokenModel.fetchByRefreshToken(refreshToken);
        return token;
    }

    public async getUser(username: string, password: string): Promise<Usuarios> {
        const user = await this.UsuariosModel.fetchByUsernameAndPassword(username, password);
        return user;
    }

    public async saveToken(token: OAuthGenericToken, client: OAuthClient, user: Usuarios): Promise<OAuthGenericToken> {
        if (token.accessToken !== undefined) {
            const accessToken = new OAuthAccessToken();
            accessToken.accessToken = token.accessToken;
            accessToken.clientId = client.Id;
            accessToken.userId = user.Id;
            accessToken.accessTokenExpiresAt = token.accessTokenExpiresAt;
            accessToken.accessToken = token.accessToken;
            accessToken.scope = token.scope;
            await accessToken.save();
        }
        if (token.refreshToken !== undefined) {
            const refreshToken = new OAuthRefreshToken();
            refreshToken.clientId = client.Id;
            refreshToken.userId = user.Id;
            refreshToken.refreshToken = token.refreshToken;
            refreshToken.refreshTokenExpiresAt = token.refreshTokenExpiresAt;
            refreshToken.scope = token.scope;
            await refreshToken.save();
        }
        token.client = client;
        token.user = user;
        return token;
    }

    public async revokeToken(token: OAuthRefreshToken): Promise<boolean> {
        try {
            const clonedToken: OAuthRefreshToken = await this.OAuthRefreshTokenModel.fetchById(token.Id);
            clonedToken.destroy();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * @description Revokes both access and refresh tokens for a user
     * @param {User} user
     * @returns {Promise<void>}
     */
    public async revokeAccessAndRefreshTokens(user: Usuarios): Promise<void> {
        try {
            await this.OAuthAccessTokenModel.revokePreviousTokens(user);
            await this.OAuthRefreshTokenModel.revokePreviousTokens(user);
            return Promise.resolve();
        } catch (error) {
            throw new OAuthException('Cannot delete previous tokens');
        }
    }

    public async saveAuthorizationCode(authorizationCode: OAuthAuthorizationCode, client: any, user: any): Promise<OAuthAuthorizationCode> {
        const newAuthorizationCode = Object.assign(new OAuthAuthorizationCode(), authorizationCode);
        newAuthorizationCode.clientId = client.id;
        newAuthorizationCode.userId = user.id;
        const savedAuthorizationCode = await newAuthorizationCode.save();
        return savedAuthorizationCode;
    }

}
