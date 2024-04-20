import React, { useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { toppingAtom, toppingSelector } from "../../states/toppingState";
import {
  currentOrderAtom,
  currentOrderToppingSelector,
} from "../../states/orderState";
import { Card, Image } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getToppingTypes } from "../../helpers/sandwich-utils";

import styled from "@emotion/styled";

const { Meta } = Card;

const OrderToppings: React.FC = () => {
  const setToppingState = useSetRecoilState(toppingAtom);
  const toppings = useRecoilValueLoadable(toppingSelector);
  const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);
  const currentToppings = useRecoilValue(currentOrderToppingSelector);

  useEffect(() => {
    if (toppings.state === "hasValue") {
      setToppingState(toppings.contents);
    }
  }, []);

  const addToppingToOrder = (topping: Topping) => {
    setCurrentOrder({
      ...currentOrder,
      toppings: [...currentOrder.toppings, topping._id],
    });
  };

  const removeToppingFromOrder = (topping: Topping) => {
    setCurrentOrder({
      ...currentOrder,
      toppings: currentOrder.toppings.filter(t => t !== topping._id),
    });
  };

  return (
    toppings.state === "hasValue" && (
      <StyledOrderToppingWrapper>
        <h1>CHOOSE TOPPINGS</h1>
        {!!currentToppings.length && (
          <>
            <strong>Current selection:</strong>
            {currentToppings.map(topping => (
              <p key={topping._id}>- {topping.name}</p>
            ))}
          </>
        )}
        {getToppingTypes(toppings.contents).map(type => (
          <div key={type}>
            <h2>{type.toUpperCase()}</h2>
            <div className="grid-container">
              {toppings.contents
                .filter(topping => topping.type === type)
                .map(topping => (
                  <Card
                    key={topping._id}
                    hoverable={true}
                    actions={[
                      !currentOrder.toppings.includes(topping._id) ? (
                        <StyledCardAction
                          onClick={() => addToppingToOrder(topping)}
                        >
                          <PlusCircleOutlined />
                          <span>Add to Order</span>
                        </StyledCardAction>
                      ) : (
                        <StyledCardAction
                          onClick={() => removeToppingFromOrder(topping)}
                        >
                          <MinusCircleOutlined />
                          <span>Remove from Order</span>
                        </StyledCardAction>
                      ),
                    ]}
                    cover={
                      <StyledCardCoverImage
                        alt={topping.name}
                        src={`/images${topping.image}`}
                      />
                    }
                  >
                    <Meta
                      title={
                        <>
                          {topping.name} - {topping.price}
                        </>
                      }
                    />
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </StyledOrderToppingWrapper>
    )
  );
};

const StyledOrderToppingWrapper = styled.div`
  text-align: center;
  padding: 0 10%;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, calc((100% - 40px) / 3));
    gap: 40px;
    margin: 40px 0;
  }
`;

const StyledCardCoverImage = styled(Image)`
  width: 100% !important;
  height: 240px !important;
  object-fit: cover;
`;

const StyledCardAction = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export default OrderToppings;
