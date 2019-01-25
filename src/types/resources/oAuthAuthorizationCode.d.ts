declare module 'resources' {

    interface OAuthAuthorizationCode {
        id: number;
        authorizationCode: string;
        expires: Date;
        redirectUri: string;
        scope: string;
        clientId: number;
        userId: number;
    }

}
