import { RecoilState, atom, selector } from "recoil";
import { getAllSandwiches } from "../services/sandwich";

export const sandwichAtom: RecoilState<Sandwich[] | []> = atom<Sandwich[] | []>(
  {
    key: "sandwichAtom",
    default: [],
  }
);

export const sandwichSelector = selector({
  key: "sandwichSelector",
  get: async ({ get }) => {
    const cachedSandwichState = get(sandwichAtom);
    if (cachedSandwichState.length > 0) {
      return cachedSandwichState;
    }
    const sandwiches = await getAllSandwiches();
    return sandwiches;
  },
});
