declare module 'resources' {

    interface Category {
        id: number;
        name: string;
        description: string;
        isActive: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
    }

}
