type Order = {
  sandwichId: string;
  userId: string;
  status: OrderStatus;
  toppings: string[];
  quantity: number;
  price: number;
  addOnNote?: string;
  orderTime: Date;
};

type OrderStatus = "ordered" | "received" | "inQueue" | "ready" | "failed";

type OrderBody = Omit<Order, "userId" | "orderTime">;

type User = {
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
};

type UserRole = "admin" | "customer";

type UserBody = Partial<User>;

type UserLoginBody = Omit<User, "role" | "email">;

type UserRegisterBody = Omit<User, "role">;

type Sandwich = {
  name: string;
  price: number;
  image: string;
  breadType: BreadType;
  description: string;
  originCity: string;
};

type BreadType = "oat" | "rye" | "wheat";

type SandwichBody = Partial<Sandwich>;

type Topping = {
  name: string;
  price: number;
  type: ToppingType;
  image: string;
};

type ToppingType = "name" | "price" | "type" | "image";
