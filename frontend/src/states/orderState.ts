import { RecoilState, atom, selector } from "recoil";
import { sandwichSelector } from "./sandwichState";
import { toppingSelector } from "./toppingState";

export const currentOrderAtom: RecoilState<OrderBody> = atom<OrderBody>({
  key: "currentOrderAtom",
  default: {
    sandwichId: "",
    toppings: [],
    quantity: 1,
    price: 0,
    addOnNote: "",
  },
});

export const currentOrderSandwichSelector = selector({
  key: "currentOrderSandwichSelector",
  get: ({ get }) => {
    const currentOrder = get(currentOrderAtom);
    const sandwichId = currentOrder ? currentOrder.sandwichId : null;
    if (!sandwichId) return null;
    const sandwiches = get(sandwichSelector);
    return sandwiches.find((s) => s._id === sandwichId);
  },
});

export const currentOrderToppingSelector = selector({
  key: "currentOrderToppingSelector",
  get: ({ get }) => {
    const currentOrder = get(currentOrderAtom);
    const orderToppings = currentOrder ? currentOrder.toppings : [];
    if (!orderToppings.length) return [];
    const toppings = get(toppingSelector);
    return toppings.filter((t) => orderToppings.includes(t._id));
  },
});

export const currentOrderPriceSelector = selector({
  key: "currentOrderPriceSelector",
  get: ({ get }) => {
    let price = 0;

    const sandwich = get(currentOrderSandwichSelector);
    if (sandwich) price += sandwich.price;

    const toppings = get(currentOrderToppingSelector);
    price = toppings.reduce((acc, t) => acc + t.price, price);

    return price;
  },
});