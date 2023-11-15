export interface MappedOrder {
  id: number;
  createdAt: Date;
  orderItems: {
    id: number;
    quantity: number;
    pizza: {
      id: number;
      name: string;
      ingredients: {
        name: string;
      }[];
    };
  }[];
}
