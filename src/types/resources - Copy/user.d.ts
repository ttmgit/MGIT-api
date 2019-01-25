declare module 'resources' {

    interface User {
        id: number;
        name: string;
        username: string;
        password: string;
        surname: string;
        secondSurname: string;
        isActive: boolean;
        isBlocked: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
        email: string;
    }

}
