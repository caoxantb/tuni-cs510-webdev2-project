import { RecoilState, atom } from "recoil";

type ModalType = "login" | "register";

export const modalTypeAtom: RecoilState<ModalType> = atom<ModalType>({
  key: "modalTypeAtom",
  default: "login",
});

export const modalOpenAtom: RecoilState<boolean> = atom<boolean>({
  key: "modalOpenAtom",
  default: false,
});