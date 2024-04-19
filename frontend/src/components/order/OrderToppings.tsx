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
import { Card } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getToppingTypes } from "../../helpers/sandwich-utils";

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

  return (
    toppings.state === "hasValue" && (
      <div style={{ textAlign: "center", padding: "0 10%" }}>
        <h1>CHOOSE TOPPINGS</h1>
        {!!currentToppings.length && (
          <>
            <strong>Current selection:</strong>
            {currentToppings.map((topping) => (
              <p key={topping._id}>- {topping.name}</p>
            ))}
          </>
        )}
        {getToppingTypes(toppings.contents).map((type) => (
          <div key={type}>
            <h2>{type.toUpperCase()}</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, calc((100% - 40px)/3))",
                gap: "40px",
                margin: "40px 0",
              }}
            >
              {toppings.contents
                .filter((topping) => topping.type === type)
                .map((topping) => (
                  <Card
                    key={topping._id}
                    hoverable={true}
                    actions={[
                      !currentOrder.toppings.includes(topping._id) ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                          onClick={() =>
                            setCurrentOrder({
                              ...currentOrder,
                              toppings: [...currentOrder.toppings, topping._id],
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
                              toppings: currentOrder.toppings.filter(
                                (t) => t !== topping._id
                              ),
                            })
                          }
                        >
                          <MinusCircleOutlined />
                          <span>Remove from Order</span>
                        </div>
                      ),
                    ]}
                    cover={
                      <img
                        alt={topping.name}
                        src={`/images${topping.image}`}
                        style={{
                          width: "100%",
                          height: "240px",
                          objectFit: "cover",
                        }}
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
      </div>
    )
  );
};

export default OrderToppings;
