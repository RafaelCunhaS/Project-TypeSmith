export interface Product {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}

export type ProductWithoutIds = Omit<Product, 'id' | 'orderId'>;

export type ProductWithId = Omit<Product, 'orderId'>;