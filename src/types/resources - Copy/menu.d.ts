declare module 'resources' {

    interface Menu {
        id: number;
        name: string;
        moduleId: number;
        isActive: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
    }

}
