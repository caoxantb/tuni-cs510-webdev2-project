import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentOrderAtom,
  currentOrderPriceSelector,
  currentOrderSandwichSelector,
  currentOrderToppingSelector,
} from "../../states/orderState";
import { Button, Divider, Input, InputNumber, InputNumberProps } from "antd";
import styled from "@emotion/styled";
import { parseIntRound } from "../../helpers/number-utils";

const OrderFinal: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);
  const currentPrice = useRecoilValue(currentOrderPriceSelector);
  const currentSandwich = useRecoilValue(currentOrderSandwichSelector);
  const currentToppings = useRecoilValue(currentOrderToppingSelector);

  useEffect(() => {
    setCurrentOrder({ ...currentOrder, price: currentPrice });
  }, [currentPrice]);

  const updatePrice = (value: InputNumberProps["value"]) => {
    const quantity = value ? parseInt(value.toString()) : 1;

    setCurrentOrder({
      ...currentOrder,
      quantity,
      price: parseIntRound(currentPrice * quantity),
    });
  };

  return (
    <StyledOrderFinalWrapper>
      <h1>FINALIZE YOUR ORDER</h1>
      {!currentSandwich ? (
        <div className="help-text">
          Please choose your favored Banh-Mi to begin this unique culinary
          journey!
        </div>
      ) : (
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
            <Button type="primary">Submit Order</Button>
            <Button danger type="primary">
              Cancel Order
            </Button>
          </div>
        </>
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

export default OrderFinal;
