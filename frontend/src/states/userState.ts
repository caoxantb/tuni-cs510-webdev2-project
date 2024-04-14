import { RecoilState, atom, selector } from "recoil";
import { getCurrentUser } from "../services/user";

export const currentUserAtom: RecoilState<User | null> = atom<User | null>({
  key: "currentUser",
  default: null,
});

export const currentUserSelector = selector({
  key: "currentUserSelector",
  get: async ({ get }) => {
    const cachedCurrentUserState = get(currentUserAtom);
    if (cachedCurrentUserState) {
      return cachedCurrentUserState;
    }
    const currentUser = await getCurrentUser();
    return currentUser;
  },
});
