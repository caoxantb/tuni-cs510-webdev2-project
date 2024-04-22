import { RecoilState, atom } from "recoil";

export const activeOrderTab: RecoilState<OrderTabKey> = atom<OrderTabKey>({
  key: "activeOrderTab",
  default: "banh-mi",
});
