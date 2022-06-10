export interface Order {
  id: number,
  userId: number,
  productsIds: number[],
}

export interface ReceiveOrder {
  productsIds: number[]
}

export interface CreatedOrder {
  userId: number,
  productsIds: number[]
}