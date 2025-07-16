import { Product } from './product';

export interface CartItemType {
  product: Product;
  quantity: number;
}