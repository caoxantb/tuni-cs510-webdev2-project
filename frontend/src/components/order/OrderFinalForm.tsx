import React from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  currentOrderAtom,
  currentOrderPriceSelector,
  currentOrderSandwichSelector,
  currentOrderToppingSelector,
  queriedOrderAtom,
} from "../../states/orderState";
import { Button, Input, InputNumber, InputNumberProps, Popconfirm } from "antd";
import styled from "@emotion/styled";
import { parseIntRound } from "../../helpers/data-format-utils";
import { activeOrderTab } from "../../states/orderTabState";
import { createOrder } from "../../services/order";
import OrderDetail from "./OrderDetail";

const OrderFinalForm: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);
  const currentSandwich = useRecoilValue(currentOrderSandwichSelector);
  const currentToppings = useRecoilValue(currentOrderToppingSelector);
  const currentPrice = useRecoilValue(currentOrderPriceSelector);
  const resetCurrentOrder = useResetRecoilState(currentOrderAtom);
  const resetTabKey = useResetRecoilState(activeOrderTab);
  const setQueriedOrder = useSetRecoilState(queriedOrderAtom);

  const updatePrice = (value: InputNumberProps["value"]) => {
    const quantity = value ? parseInt(value.toString()) : 1;

    setCurrentOrder({
      ...currentOrder,
      quantity,
      price: parseIntRound(currentPrice * quantity),
    });
  };

  const QuantityInput = (
    <StyledInputNumber
      min={1}
      max={10}
      defaultValue={1}
      onChange={updatePrice}
    />
  );

  const AddOnNoteInput = (
    <StyledInputArea
      showCount
      maxLength={100}
      placeholder="Please provide us any additional information for your order!"
      onChange={e => {
        setCurrentOrder({
          ...currentOrder,
          addOnNote: e.target.value,
        });
      }}
    />
  );

  return (
    <>
      <OrderDetail
        type="form"
        sandwich={currentSandwich}
        toppings={currentToppings}
        price={currentPrice}
        totalPrice={currentOrder.price}
        QuantityInput={QuantityInput}
        AddOnNoteInput={AddOnNoteInput}
      />
      <div className="button-wrapper">
        <Button
          type="primary"
          onClick={async () => {
            const newOrder = await createOrder(currentOrder);
            setQueriedOrder(newOrder);
          }}
        >
          Submit Order
        </Button>
        <Popconfirm
          title="Cancel order"
          description="Are you sure to cancel the order?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            resetCurrentOrder();
            resetTabKey();
          }}
        >
          <Button danger type="primary">
            Cancel Order
          </Button>
        </Popconfirm>
      </div>
    </>
  );
};

const StyledInputArea = styled(Input.TextArea)`
  height: 120px;
  resize: none;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 60px;
`;

export default OrderFinalForm;
