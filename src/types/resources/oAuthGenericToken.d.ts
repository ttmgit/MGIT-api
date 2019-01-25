declare module 'resources' {

     interface OAuthGenericToken {
        accessToken: string;
        accessTokenExpiresAt: Date;
        refreshToken: string;
        refreshTokenExpiresAt: Date;
        scope: string;
        client: any;
        user: any;
    }

}
