import { Product } from "./product.model";
import { User } from "./user.model";

/** * Represents a product review. */

export interface Review{
    reviewId?:number;
    reviewText:string;
    rating:number;
    date:string;
    user:User;
    product:Product;
}