import { Order } from "./order.model";
import { Product } from "./product.model";

/** * Represents an item in an order. */
export interface OrderItem{
    orderItemId?:number;
    product:Product;
    quantity:number;
    price:number;
    order?: Order; // Optional as it should be set by the backend
}