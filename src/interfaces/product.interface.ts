export interface ProductWithIds {
  id: number;
  name: string;
  amount: string;
  orderId: number;
}

export type Product = Omit<ProductWithIds, 'id' | 'orderId'>;