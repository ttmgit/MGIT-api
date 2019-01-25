declare module 'resources' {

    interface Product {
        id: number;
        sku: string;
        shortDescription: string;
        largeDescription: string;
        itemsByCase: string;
        isSerial: boolean;
        isLot: boolean;
        isKit: boolean;
        requiereInspection: boolean;
        isActive: boolean;
        lotDaysInterval: number;
        sendInterface: boolean;
        checkNumber: string;
        created: Date;
        updated: Date;
        _pivot_quantity?: number; // Added due to withPivot relationship with order_has_product
        product_brand: string;
        product_handling: string;
        supplier: string;
        weight: string;
    }

}
