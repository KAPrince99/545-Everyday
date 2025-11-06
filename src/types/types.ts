export interface ClothDataProps {
  id: string;
  name: string;
  color: string;
  price: string;
  details: string[];
  delivery: string;
  front_image: string;
  image_p1: string;
  image_p2: string;
  image_p3: string;
}

export interface CartItemProps {
  id?: string | number;
  front_image: string;
  name: string;
  price: string;
  size: string | null;
  cloth_id: string;
  color: string;
}

export interface CartDataProps {
  front_image: string;
  name: string;
  price: string;
  size: string | null;
  cloth_id: string;
  color: string;
}
