export interface OrderItem {
  name: string;
  quantity: number;
}

export interface OrderModel {
  id: number;
  items: OrderItem[];
  type: 'order';
}
