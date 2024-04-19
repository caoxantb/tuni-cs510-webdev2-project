import { RecoilState, atom } from "recoil";

export const isLoggedInAtom: RecoilState<boolean> = atom<boolean>({
	key: "isLoggedInAtom",
	default: false,
});

export const isOpenAtom: RecoilState<boolean> = atom<boolean>({
	key: "isOpenAtom",
	default: false,
});

export const isConfirmLoadingAtom: RecoilState<boolean> = atom<boolean>({
	key: "isConfirmLoadingAtom",
	default: false,
});

export const isDisableAtom: RecoilState<boolean> = atom<boolean>({
	key: "isDisableAtom",
	default: false,
});

export const isRegisterAtom: RecoilState<boolean> = atom<boolean>({
	key: "isRegisterAtom",
	default: false,
});
