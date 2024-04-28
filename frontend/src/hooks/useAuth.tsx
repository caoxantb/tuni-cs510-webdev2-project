import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUserAtom, currentUserSelector } from "../states/userState";
import { currentUserOrdersAtom } from "../states/orderState";
import { getCurrentUserOrders } from "../services/order";

/**
 * Custom hook for managing authentication.
 */
export const useAuth = () => {
  const currentUser = useRecoilValueLoadable(currentUserSelector);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const setAllOrder = useSetRecoilState(currentUserOrdersAtom);

  useEffect(() => {
    if (currentUser.state === "hasValue") {
      setCurrentUser(currentUser.contents);
    }
  }, [currentUser]);

  useEffect(() => {
    const initUserOrders = async () => {
      try {
        const userOrders = await getCurrentUserOrders();
        setAllOrder(userOrders);
      } catch (err) {
        setAllOrder([]);
      }
    };

    initUserOrders();
  }, [currentUser]);
};
