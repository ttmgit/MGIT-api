declare module 'resources' {

    interface Order {
        id: number;
        name: string;
        requestPerson: string;
        orderDate: Date;
        optimalDeliveryDate: Date;
        created: Date;
        updated: Date;
    }

}
