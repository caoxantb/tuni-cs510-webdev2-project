import React from "react";
import { Tabs, TabsProps } from "antd";
import OrderSandwich from "./OrderSandwich";
import OrderToppings from "./OrderToppings";
import OrderFinal from "./OrderFinal";
import { useRecoilValueLoadable } from "recoil";
import { currentUserSelector } from "../../states/userState";

const OrderPage: React.FC = () => {
  const currentUser = useRecoilValueLoadable(currentUserSelector);

  console.log(currentUser.contents);

  const items: TabsProps["items"] = [
    {
      label: "1. Choose a Banh Mi",
      key: "banh-mi",
      children: <OrderSandwich />,
    },
    {
      label: "2. Choose toppings",
      key: "toppings",
      children: <OrderToppings />,
    },
    {
      label: "3. Finalize your order",
      key: "finalize-order",
      children: <OrderFinal />,
    },
  ];

  return currentUser.contents ? (
    <Tabs defaultActiveKey="1" centered items={items} size="large" />
  ) : (
    <div
      style={{
        margin: "24px 0",
        padding: "0 10%",
        color: "black",
        textAlign: "center",
      }}
    >
      Please log in to start your order.
    </div>
  );
};

export default OrderPage;
