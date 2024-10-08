import React, { useEffect } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import {
  currentOrderAtom,
  currentOrderSandwichSelector,
} from "../../states/orderState";
import { Card, Image } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";

const OrderSandwich: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);
  const [currentOrder, setCurrentOrder] = useRecoilState(currentOrderAtom);
  const currentSandwich = useRecoilValue(currentOrderSandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  const addSandwichToOrder = (sandwich: Sandwich) => {
    setCurrentOrder({
      ...currentOrder,
      sandwichId: sandwich._id,
    });
  };

  const removeSandwichFromOrder = () => {
    setCurrentOrder({
      ...currentOrder,
      sandwichId: "",
    });
  };

  return (
    sandwiches.state === "hasValue" && (
      <StyledOrderSandwichWrapper>
        <h1>CHOOSE A BANH-MI</h1>
        {currentSandwich && (
          <>
            <strong>Current selection:</strong>
            <p>- {currentSandwich.name}</p>
          </>
        )}
        <div className="grid-container">
          {sandwiches.contents.map((sandwich: Sandwich) => (
            <StyledCard
              isChosen={sandwich._id === currentOrder?.sandwichId}
              key={sandwich._id}
              hoverable={true}
              cover={
                <StyledCardCoverImage
                  alt={sandwich.name}
                  src={`/images${sandwich.image}`}
                />
              }
              actions={[
                sandwich._id !== currentOrder?.sandwichId ? (
                  <StyledCardAction
                    action="add"
                    onClick={() => addSandwichToOrder(sandwich)}
                  >
                    <PlusCircleOutlined />
                    <span>Add to Order</span>
                  </StyledCardAction>
                ) : (
                  <StyledCardAction
                    action="remove"
                    onClick={removeSandwichFromOrder}
                  >
                    <MinusCircleOutlined />
                    <span>Remove from Order</span>
                  </StyledCardAction>
                ),
              ]}
            >
              <StyledCardMeta
                title={
                  <>
                    {sandwich.name} - {sandwich.price}
                  </>
                }
                description={sandwich.description}
              />
            </StyledCard>
          ))}
        </div>
      </StyledOrderSandwichWrapper>
    )
  );
};

const StyledOrderSandwichWrapper = styled.div`
  text-align: center;
  padding: 0 10%;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, calc((100% - 40px) / 2));
    gap: 40px;
    margin: 40px 0;
  }
`;

const StyledCard = styled(Card)<{isChosen: boolean}>(props => ({
  border: props.isChosen ? "4px solid darkgoldenrod" : "1px solid #f0f0f0",
  "&:hover": {
    border: props.isChosen ? "4px solid darkgoldenrod" : "1px solid #f0f0f0",
  }
}))

const StyledCardCoverImage = styled(Image)`
  width: 100% !important;
  height: 480px !important;
  object-fit: cover;
`;

const StyledCardMeta = styled(Card.Meta)`
  height: 160px;

  .ant-card-meta-detail {
    overflow: scroll;
  }
`;

const StyledCardAction = styled.div<{ action: string }>(props => ({
  display: "flex",
  justifyContent: "center",
  gap: "8px",
  color: props.action === "add" ? "#a17f1a" : "red",
  transition: "color 0.3s ease",
  "&:hover": {
    color: props.action === "add" ? "gold" : "pink",
  },
}));

export default OrderSandwich;
