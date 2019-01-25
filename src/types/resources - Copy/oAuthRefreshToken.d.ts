declare module 'resources' {

    interface OAuthRefreshToken {
        id: number;
        refreshToken: string;
        expires: Date;
        scope: string;
        clientId: number;
        userId: number;
    }

}
