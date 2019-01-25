import * as crypto from 'crypto';
import * as OAuthExpressServer from 'express-oauth-server';
import { Core, Types } from '../../../constants';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';
import { OAuthAccessToken } from '../../models/OAuth/OAuthAccessToken';
import { OAuthAccessTokenNotFoundException } from '../../exceptions/OAuthAccessTokenNotFoundException';
import { OAuthAuthorizationCode } from '../../models/OAuth/OAuthAuthorizationCode';
import { OAuthClient } from '../../models/OAuth/OAuthClient';
import { OAuthClientNotFoundException } from '../../exceptions/OAuthClientNotFoundException';
import { OAuthErrors } from '../../errors/oauth.errors';
import { OAuthException } from '../../exceptions/OAuthException';
import { OAuthGenericToken } from 'resources';
import { OAuthRefreshToken } from '../../models/OAuth/OAuthRefreshToken';
import { OAuthRepository } from '../../repositories/OAuth/OAuthRepository';
import { OAuthRevokeTokenRequest } from '../../requests/OAuth/OAuthRevokeTokenRequest';
import { OAuthUnauthorizedException } from '../../exceptions/OAuthUnauthorizedException';
import { request, validate } from '../../../core/api/Validate';
import { Targets } from '../../../constants/Targets';
import { Usuarios } from '../../models/Usuarios/Usuarios';

export class OAuthService {

    public log: LoggerType;
    public oauth: OAuthExpressServer;

    constructor(@inject(Types.Repository) @named(Targets.Repository.OAuth.OAuthRepository) public oAuthRepo: OAuthRepository,
                @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType) {
        this.log = new Logger(__filename);
    }

    /**
     * @description Generates an access token and removes previous tokens
     * NOTE: This is a non-standard function of OAuth
     * @param {OAuthClient} client
     * @param {User} user
     * @param {string} scope
     * @returns {Promise<string>}
     */
    public async generateAccessToken(client: OAuthClient, user: Usuarios, scope: string): Promise<string> {
        const generatedToken = crypto.randomBytes(20).toString('hex');
        await this.oAuthRepo.revokeAccessAndRefreshTokens(user);
        return Promise.resolve(generatedToken);
    }

    /**
     * @description Generates a random refresh token
     * @param {OAuthClient} client
     * @param {User} user
     * @param {string} scope
     * @returns {Promise<string>}
     */
    public async generateRefreshToken(client: OAuthClient, user: Usuarios, scope: string): Promise<string> {
        const generatedToken = crypto.randomBytes(20).toString('hex');
        return Promise.resolve(generatedToken);
    }

    /**
     * @description Returns a OAuth client given a client id and secret
     * @param {string} clientId
     * @param {string} clientSecret
     * @returns {Promise<OAuthClient>}
     */
    public async getClient(clientId: string, clientSecret: string): Promise<OAuthClient> {
        const oauthClient = await this.oAuthRepo.getOAuthClient(clientId, clientSecret);
        if (oauthClient === null) {
            throw new OAuthClientNotFoundException();
        }
        return oauthClient;
    }

    /**
     * @description Gets the Oauth access token
     * @param {string} token
     * @returns {Promise<OAuthAccessToken>}
     */
    public async getAccessToken(token: string): Promise<OAuthAccessToken> {
        const accessToken = await this.oAuthRepo.getOAuthAccessToken(token);
        if (accessToken === null) {
            throw new OAuthAccessTokenNotFoundException();
        }
        return accessToken;
    }

    /**
     * @description Gets the Oauth refresh token
     * @param {string} token
     * @returns {Promise<OAuthAccessToken>}
     */
    public async getRefreshToken(token: string): Promise<OAuthRefreshToken> {
        const refreshToken = await this.oAuthRepo.getOAuthRefreshtoken(token);
        if (refreshToken === null) {
            throw new OAuthException(OAuthErrors.REFRESH_TOKEN_NOT_FOUND);
        }
        refreshToken.client = refreshToken.related('oAuthClient') as OAuthClient;
        refreshToken.user = refreshToken.related('oAuthUser') as Usuarios;
        if (refreshToken.user ) {
            refreshToken.user.Password = '';
        }
        return refreshToken;
    }

    public async getUser(username: string, password: string): Promise<Usuarios> {
        const user = await this.oAuthRepo.getUser(username, password);
        if (user === null) {
            throw new OAuthException(OAuthErrors.INVALID_USER);
        }
        return user;
    }

    public async saveToken(token: OAuthGenericToken, client: OAuthClient, user: Usuarios): Promise<OAuthGenericToken> {
        const savedToken = await this.oAuthRepo.saveToken(token, client, user);
        if (savedToken === null) {
            throw new OAuthException(OAuthErrors.INVALID_ACCESS_TOKEN);
        }
        return savedToken;
    }

    /**
     * @description Revokes a token per the OAuth RFC. First validates that the token corresponds to a user
     * and then tries to delete them in both, oauth_access_token and oauth_refresh_token tables.
     * @param {OAuthRevokeTokenRequest} body - The body as specified in the RFC https://tools.ietf.org/html/rfc7009#page-4
     * @param {User} user - The user performing the request given  by the OAuth Middleware
     * @returns {Promise<any>} - Returns a resolved promise if no errors were found or if an invalid token
     * was found. If unauthorized, returns an exception
     */
    @validate()
    public async revokeTokenHandler(@request(OAuthRevokeTokenRequest) body: OAuthRevokeTokenRequest, user: Usuarios): Promise<any> {
        try {
            const oAuthAccessToken = await this.getAccessToken(body.token);
            if ( oAuthAccessToken['attributes'].userId !== user.Id) {
                throw new OAuthUnauthorizedException();
            }
            return oAuthAccessToken.destroy();
        } catch (error) {
            if (error instanceof OAuthUnauthorizedException) {
                throw error;
            }
        }
        try {
            const oAuthRefreshToken = await this.getRefreshToken(body.token);
            if ( oAuthRefreshToken.userId !== user.Id) {
                throw new OAuthUnauthorizedException();
            }
            return oAuthRefreshToken.destroy();
        } catch (refreshError) {
            if (refreshError instanceof OAuthUnauthorizedException) {
                throw refreshError;
            }
        }
        return Promise.resolve();
    }


    public async revokeToken(token: OAuthRefreshToken): Promise<boolean> {
        const revokedToken = await this.oAuthRepo.revokeToken(token);
        return revokedToken;
    }

    public async saveAuthorizationCode(code: OAuthAuthorizationCode, client: any, user: any): Promise<OAuthAuthorizationCode> {
        const savedAuthorizationCode = await  this.oAuthRepo.saveAuthorizationCode(code, client, user);
        return savedAuthorizationCode;
    }

}
