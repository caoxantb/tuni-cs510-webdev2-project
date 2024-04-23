import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUserAtom, currentUserSelector } from "../states/userState";
import { currentUserOrdersAtom, currentUserOrdersSelector } from "../states/orderState";
import { depopulateOrders } from "../helpers/sandwich-utils";

export const useAuth = () => {
  const currentUser = useRecoilValueLoadable(currentUserSelector);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setAllOrder = useSetRecoilState(currentUserOrdersAtom);
  const orders = useRecoilValueLoadable(currentUserOrdersSelector)

  useEffect(() => {
    if (currentUser.state === "hasValue") {
      setCurrentUser(currentUser.contents);
    }

    if (orders.state === "hasValue") {
      const depopulateOrder = depopulateOrders(orders.contents);
      setAllOrder(depopulateOrder);
    }
  }, [currentUser]);
};
