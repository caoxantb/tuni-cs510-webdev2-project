import { atom, selector, RecoilState } from "recoil";
import { getAllToppings } from "../services/topping";

export const toppingAtom: RecoilState<Topping[] | []> = atom<Topping[] | []>({
  key: "toppingAtom",
  default: [],
});

export const toppingSelector = selector({
  key: "toppingSelector",
  get: async ({ get }) => {
    const cachedToppingState = get(toppingAtom);
    if (cachedToppingState.length > 0) {
      return cachedToppingState;
    }
    const toppings = await getAllToppings();
    return toppings;
  },
});
