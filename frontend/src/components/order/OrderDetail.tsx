import React from "react";
import styled from "@emotion/styled";
import { Divider } from "antd";

type OrderDetailProps = {
  type: "form" | "read-only";
  sandwich: Sandwich | null | undefined;
  toppings: (Topping | undefined)[];
  price: number;
  totalPrice: number;
  quantity?: number;
  addOnNote?: string;
  QuantityInput?: JSX.Element;
  AddOnNoteInput?: JSX.Element;
};

const OrderDetail: React.FC<OrderDetailProps> = ({
  type,
  sandwich,
  toppings,
  price,
  totalPrice,
  quantity,
  addOnNote,
  QuantityInput,
  AddOnNoteInput,
}) => {
  return (
    <>
      <p>
        <strong>Banh-mi</strong>
      </p>
      {sandwich && (
        <StyledRow>
          <div className="name">{sandwich.name}</div>
          <div>{sandwich.price}</div>
        </StyledRow>
      )}
      <p>
        <strong>Toppings</strong>
      </p>
      {!!toppings.length &&
        toppings.map(topping => (
          <StyledRow key={topping?._id}>
            <div className="name">{topping?.name}</div>
            <div>{topping?.price}</div>
          </StyledRow>
        ))}
      <Divider />
      <StyledRow>
        <p className="title">
          <strong>Price</strong>
        </p>
        <div>{price}</div>
      </StyledRow>
      <StyledRow>
        <p className="title">
          <strong>Quantity</strong>
        </p>
        {type === "read-only" ? <div>{quantity}</div> : QuantityInput}
      </StyledRow>
      <Divider />
      <StyledRow>
        <p className="title">
          <strong>TOTAL PRICE</strong>
        </p>
        <div>
          <strong>{totalPrice}</strong>
        </div>
      </StyledRow>
      <p className="title">
        <strong>ADD ON NOTE</strong>
      </p>
      {type === "read-only" ? <div>{addOnNote}</div> : AddOnNoteInput}
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

export default OrderDetail;
