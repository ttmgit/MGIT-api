declare module 'resources' {

    interface Role {
        id: number;
        name: string;
        isActive: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
    }

}
