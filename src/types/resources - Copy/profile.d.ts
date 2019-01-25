declare module 'resources' {

    interface Profile {
        id: number;
        name: string;
        isActive: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
    }

}
