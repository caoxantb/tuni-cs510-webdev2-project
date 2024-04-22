import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUserAtom, currentUserSelector } from "../states/userState";

export const useAuth = () => {
  const currentUser = useRecoilValueLoadable(currentUserSelector);
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  useEffect(() => {
    if (currentUser.state === "hasValue") {
      setCurrentUser(currentUser.contents);
    }
  }, [currentUser]);
};
