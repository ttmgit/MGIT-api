declare module 'resources' {

    interface Module {
        id: number;
        name: string;
        moduleIcon: string;
        isActive: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
    }

}
