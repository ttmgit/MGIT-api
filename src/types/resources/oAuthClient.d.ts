declare module 'resources' {

    interface OAuthClient {
        id: number;
        name: string;
        clientId: string;
        clientSecret: string;
        redirectUri: string;
        grantTypes: string;
        scope: string;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }

}
