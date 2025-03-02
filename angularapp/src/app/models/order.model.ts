import { OrderItem } from "./order-item.model";
import { User } from "./user.model";
/** * Represents an order. */
export interface Order{
   orderId?:number;
   orderDate?:string;
   orderStatus:string;
   shippingAddress:string;
   billingAddress:string;
   totalAmount:number;
   user:User;
   orderItems:OrderItem[];
}