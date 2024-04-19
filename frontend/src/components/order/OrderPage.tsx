import React from "react";
import { Tabs, TabsProps } from "antd";
import OrderSandwich from "./OrderSandwich";
import OrderToppings from "./OrderToppings";
import OrderFinal from "./OrderFinal";

const OrderPage: React.FC = () => {
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

  return <Tabs defaultActiveKey="1" centered items={items} size="large" />;
};

export default OrderPage;
