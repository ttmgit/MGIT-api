declare module 'resources' {

    interface OAuthAccessToken {
        id: number;
        accessToken: string;
        expires: Date;
        scope: string;
        clientId: number;
        userId: number;
    }

}
