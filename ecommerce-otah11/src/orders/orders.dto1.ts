import { OrderDto2 } from './orders.dto2';

export interface OrderDto1 {
    userId: string,
    products: OrderDto2[],
}