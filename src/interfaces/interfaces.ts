export interface ShoppingList {
  id: string;
  items?: (ItemsEntity)[] | null;
  total: number;
  total_bought: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  budget: string;
  limit: string;
  shopper: number;
}
export interface ItemsEntity {
  id: string;
  item: Item;
  price: number;
  created_at: string;
  updated_at: string;
  quantity: number;
  bought: boolean;
  shopper: number;
  list: string;
}
export interface Item {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  price: string;
  size: string;
  unit: string;
}
