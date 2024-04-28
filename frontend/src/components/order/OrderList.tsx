import React from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { currentUserOrdersAtom } from "../../states/orderState";
import { useParams } from "react-router-dom";
import { Collapse } from "antd";
import styled from "@emotion/styled";
import { parseDate, parseIntRound } from "../../helpers/data-format-utils";
import OrderDetail from "./OrderDetail";
import { sandwichSelector } from "../../states/sandwichState";
import { populateOrders } from "../../helpers/sandwich-utils";
import { toppingSelector } from "../../states/toppingState";

const OrderList: React.FC = () => {
  const sandwiches = useRecoilValueLoadable(sandwichSelector);
  const toppingList = useRecoilValueLoadable(toppingSelector);
  const orders = useRecoilValue(currentUserOrdersAtom);
  const { userId } = useParams();

  return (
    orders &&
    sandwiches.state === "hasValue" &&
    toppingList.state === "hasValue" && (
      <StyledAccordionWrapper>
        <StyledCollapse
          accordion
          items={populateOrders(
            orders,
            sandwiches.contents,
            toppingList.contents,
          )
            .filter(order => order.userId === userId)
            .sort(
              (a, b) =>
                new Date(b.orderTime).getTime() -
                new Date(a.orderTime).getTime(),
            )
            .map(order => ({
              key: order._id,
              label: (
                <>
                  <div>
                    <strong>Order ID: #{order._id}</strong>
                  </div>
                  <div className="order-subtext">
                    Order {parseDate(order.orderTime)}
                  </div>
                </>
              ),
              children: (
                <OrderDetail
                  type="read-only"
                  sandwich={order.sandwich}
                  toppings={order.toppings}
                  totalPrice={order.price}
                  price={parseIntRound(order.price / order.quantity)}
                  quantity={order.quantity}
                  addOnNote={order.addOnNote}
                />
              ),
              extra: <Status orderStatus={order.status}>{order.status}</Status>,
            }))}
        />
      </StyledAccordionWrapper>
    )
  );
};

const StyledAccordionWrapper = styled.div`
  padding: 0 10%;
  margin: 40px 0;
`;

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    align-items: center !important;
  }

  .order-subtext {
    font-style: italic;
  }
`;

const Status = styled.p<{ orderStatus: string }>(props => ({
  color:
    props.orderStatus === "ready"
      ? "green"
      : props.orderStatus === "failed"
      ? "red"
      : "black",
}));

export default OrderList;
