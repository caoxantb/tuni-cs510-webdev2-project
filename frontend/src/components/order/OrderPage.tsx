import React from "react";
import { Tabs, TabsProps } from "antd";
import OrderSandwich from "./OrderSandwich";
import OrderToppings from "./OrderToppings";
import OrderFinal from "./OrderFinal";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { currentUserAtom } from "../../states/userState";
import styled from "@emotion/styled";
import { activeOrderTab } from "../../states/orderTabState";
import {
  currentOrderAtom,
  queriedOrderAtom,
  queriedOrderIdSelector,
  queriedOrderStatusSelector,
} from "../../states/orderState";

const OrderPage: React.FC = () => {
  const currentUser = useRecoilValue(currentUserAtom);
  const resetQueriedOrder = useResetRecoilState(queriedOrderAtom);
  const resetCurrentOrder = useResetRecoilState(currentOrderAtom);
  const queriedOrderStatus = useRecoilValue(queriedOrderStatusSelector);
  const queriedOrderId = useRecoilValue(queriedOrderIdSelector);
  const [activeKey, setActiveKey] = useRecoilState(activeOrderTab);

  const items: TabsProps["items"] = [
    {
      label: "1. Choose a Banh Mi",
      key: "banh-mi",
      children: <OrderSandwich />,
      disabled:
        queriedOrderStatus !== "ready" &&
        activeKey === "finalize-order" &&
        queriedOrderId !== "",
    },
    {
      label: "2. Choose toppings",
      key: "toppings",
      children: <OrderToppings />,
      disabled:
        queriedOrderStatus !== "ready" &&
        activeKey === "finalize-order" &&
        queriedOrderId !== "",
    },
    {
      label: "3. Finalize your order",
      key: "finalize-order",
      children: <OrderFinal />,
    },
  ];

  const onChange = (key: string) => {
    if (activeKey === "finalize-order" && queriedOrderStatus === "ready") {
      resetQueriedOrder();
      resetCurrentOrder();
    }
    setActiveKey(key as OrderTabKey);
  };

  return currentUser ? (
    <Tabs
      activeKey={activeKey}
      onChange={onChange}
      centered
      items={items}
      size="large"
    />
  ) : (
    <StyledLoginRequestText>
      Please log in to start your order.
    </StyledLoginRequestText>
  );
};

const StyledLoginRequestText = styled.div`
  margin: 24px 0;
  padding: 0 10%;
  color: black;
  text-align: center;
`;

export default OrderPage;
