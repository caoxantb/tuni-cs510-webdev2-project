type Order = {
  _id: string;
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

type OrderBody = Omit<Order, "userId" | "orderTime" | "status" | "_id">;

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
};

type UserRole = "admin" | "customer";

type UserBody = Partial<User>;

type UserLoginBody = Omit<User, "role" | "email" | "_id">;

type UserRegisterBody = Omit<User, "role" | "_id">;

type Sandwich = {
  _id: string;
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
  _id: string;
  name: string;
  price: number;
  type: ToppingType;
  image: string;
};

type ToppingType = "meat" | "veggies" | "cheese" | "sauce";
