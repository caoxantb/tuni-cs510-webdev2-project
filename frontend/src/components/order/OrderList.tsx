import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import {
  currentUserOrdersAtom,
  currentUserOrdersSelector,
} from "../../states/orderState";
import { useParams } from "react-router-dom";
import { Collapse } from "antd";
import styled from "@emotion/styled";
import { parseDate, parseIntRound } from "../../helpers/data-format-utils";
import { depopulateOrders } from "../../helpers/sandwich-utils";
import OrderDetail from "./OrderDetail";

const OrderList: React.FC = () => {
  const setAllOrder = useSetRecoilState(currentUserOrdersAtom);
  const orders = useRecoilValueLoadable(currentUserOrdersSelector);
  const { userId } = useParams();

  useEffect(() => {
    if (orders.state === "hasValue") {
      const depopulateOrder = depopulateOrders(orders.contents);
      setAllOrder(depopulateOrder);
    }
  }, []);

  return (
    orders.state === "hasValue" && (
      <StyledAccordionWrapper>
        <StyledCollapse
          accordion
          items={orders.contents
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
