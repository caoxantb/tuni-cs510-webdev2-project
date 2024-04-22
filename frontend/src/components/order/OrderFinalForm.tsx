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
import {
  Button,
  Divider,
  Input,
  InputNumber,
  InputNumberProps,
  Popconfirm,
} from "antd";
import styled from "@emotion/styled";
import { parseIntRound } from "../../helpers/data-format-utils";
import { activeOrderTab } from "../../states/orderTabState";
import { createOrder } from "../../services/order";

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

  return (
    <>
      <p>
        <strong>Banh-mi</strong>
      </p>
      {currentSandwich && (
        <StyledRow>
          <div className="name">{currentSandwich.name}</div>
          <div>{currentSandwich.price}</div>
        </StyledRow>
      )}
      <p>
        <strong>Toppings</strong>
      </p>
      {!!currentToppings.length &&
        currentToppings.map(topping => (
          <StyledRow key={topping._id}>
            <div className="name">{topping.name}</div>
            <div>{topping.price}</div>
          </StyledRow>
        ))}
      <Divider />
      <StyledRow>
        <p className="title">
          <strong>Price</strong>
        </p>
        <div>{currentPrice}</div>
      </StyledRow>
      <StyledRow>
        <p className="title">
          <strong>Quantity (max. 10)</strong>
        </p>
        <StyledInputNumber
          min={1}
          max={10}
          defaultValue={1}
          onChange={updatePrice}
        />
      </StyledRow>
      <Divider />
      <StyledRow>
        <p className="title">
          <strong>TOTAL PRICE</strong>
        </p>
        <div>
          <strong>{currentOrder.price}</strong>
        </div>
      </StyledRow>
      <p className="title">
        <strong>ADD ON NOTE</strong>
      </p>
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

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    padding: 0 5%;
  }
`;

const StyledInputArea = styled(Input.TextArea)`
  height: 120px;
  resize: none;
`;

const StyledInputNumber = styled(InputNumber)`
  width: 60px;
`;

export default OrderFinalForm;
