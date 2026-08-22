export declare const OrderStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly RESERVED: "RESERVED";
    readonly CLOSED: "CLOSED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
