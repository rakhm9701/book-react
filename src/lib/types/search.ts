export interface CartItem{
    _id: string;
    quantity: number;
    name: string;
    price: number;
    image: string;
}

export interface ProductLike {
  id: number;
  name: string;
  price: number;
  likes: number; // Mahsulotga qancha like berilganini ko'rsatadi
}