import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentOrderAtom,
  currentOrderPriceSelector,
  currentOrderSandwichSelector,
  queriedOrderAtom,
  queriedOrderIdSelector,
  queriedOrderStatusSelector,
} from "../../states/orderState";
import styled from "@emotion/styled";
import { getOrderById } from "../../services/order";
import OrderFinalForm from "./OrderFinalForm";
import OrderFinalSteps from "./OrderFinalSteps";

const OrderFinal: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);
  const currentPrice = useRecoilValue(currentOrderPriceSelector);
  const currentSandwich = useRecoilValue(currentOrderSandwichSelector);
  const setQueriedOrder = useSetRecoilState(queriedOrderAtom);
  const queriedOrderId = useRecoilValue(queriedOrderIdSelector);
  const queriedOrderStatus = useRecoilValue(queriedOrderStatusSelector);

  useEffect(() => {
    setCurrentOrder({ ...currentOrder, price: currentPrice });
  }, [currentPrice]);

  useEffect(() => {
    const fetch = async () => {
      const order = await getOrderById(queriedOrderId);
      setQueriedOrder(order);
    };

    if (queriedOrderId !== "" && queriedOrderStatus !== "ready") {
      const intervalId = setInterval(() => {
        fetch();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [queriedOrderId, queriedOrderStatus]);

  return (
    <StyledOrderFinalWrapper>
      <h1>FINALIZE YOUR ORDER</h1>
      {!currentSandwich ? (
        <div className="help-text">
          Please choose your favored Banh-Mi to begin this unique culinary
          journey!
        </div>
      ) : queriedOrderId === "" ? (
        <OrderFinalForm />
      ) : (
        <OrderFinalSteps />
      )}
    </StyledOrderFinalWrapper>
  );
};

const StyledOrderFinalWrapper = styled.div`
  padding: 0 30%;

  h1,
  .help-text {
    text-align: center;
  }

  .title {
    margin: 8px 0;
  }

  .button-wrapper {
    margin: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export default OrderFinal;
