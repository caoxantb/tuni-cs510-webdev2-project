import { RecoilState, atom } from "recoil";

export const isLoggedInState: RecoilState<boolean> = atom<boolean>({
	key: "isLoggedInState",
	default: false,
});

export const isModalOpenState: RecoilState<boolean> = atom<boolean>({
	key: "isModalOpenState",
	default: false,
});

export const isModalConfirmLoadingState: RecoilState<boolean> = atom<boolean>({
	key: "isModalConfirmLoadingState",
	default: false,
});

export const isFormDisableState: RecoilState<boolean> = atom<boolean>({
	key: "isFormDisableState",
	default: false,
});
