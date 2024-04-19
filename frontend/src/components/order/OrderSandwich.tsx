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
import { Card } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";

const { Meta } = Card;

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

  return (
    sandwiches.state === "hasValue" && (
      <div style={{ textAlign: "center", padding: "0 10%" }}>
        <h1>CHOOSE A BANH-MI</h1>
        {currentSandwich && (
          <>
            <strong>Current selection:</strong>
            <p>- {currentSandwich.name}</p>
          </>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, calc((100% - 40px)/2))",
            gap: "40px",
            margin: "40px 0",
          }}
        >
          {sandwiches.contents.map((sandwich: Sandwich) => (
            <Card
              key={sandwich._id}
              hoverable={true}
              cover={
                <img
                  alt={sandwich.name}
                  src={`/images${sandwich.image}`}
                  style={{ width: "100%", height: "480px", objectFit: "cover" }}
                />
              }
              actions={[
                sandwich._id !== currentOrder?.sandwichId ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onClick={() =>
                      setCurrentOrder({
                        ...currentOrder,
                        sandwichId: sandwich._id,
                      })
                    }
                  >
                    <PlusCircleOutlined />
                    <span>Add to Order</span>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onClick={() =>
                      setCurrentOrder({
                        ...currentOrder,
                        sandwichId: "",
                      })
                    }
                  >
                    <MinusCircleOutlined />
                    <span>Remove from Order</span>
                  </div>
                ),
              ]}
            >
              <StyledMeta
                title={
                  <>
                    {sandwich.name} - {sandwich.price}
                  </>
                }
                description={sandwich.description}
              />
            </Card>
          ))}
        </div>
      </div>
    )
  );
};

const StyledMeta = styled(Meta)`
  height: 160px;

  & > .ant-card-meta-detail {
    overflow: scroll !important;
  }
`;

export default OrderSandwich;
