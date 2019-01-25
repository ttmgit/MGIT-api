declare module 'resources' {

    interface Account {
        id: number;
        name: string;
        address: string;
        phone1: string;
        phone2: string;
        contact: string;
        email: string;
        categoryId: number;
        rfc: string;
        prefix: string;
        sapCode: string;
        isActive: boolean;
        isBlocked: boolean;
        isDeleted: boolean;
        created: Date;
        updated: Date;
        account_code: string;
        zipcode: string;
        neighborhood: string;
        district: string;
        state: string;
        finnancial_start_date: Date;
    }

}
