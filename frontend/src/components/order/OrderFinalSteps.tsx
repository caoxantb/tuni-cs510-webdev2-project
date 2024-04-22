import React from "react";
import {
  LoadingOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  HourglassOutlined,
} from "@ant-design/icons";
import { Button, Result, Steps } from "antd";
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  currentOrderAtom,
  queriedOrderAtom,
  queriedOrderStatusSelector,
} from "../../states/orderState";
import styled from "@emotion/styled";
import { activeOrderTab } from "../../states/orderTabState";
import { Link } from "react-router-dom";
import { currentUserAtom } from "../../states/userState";

const OrderFinalSteps: React.FC = () => {
  const currentUser = useRecoilValue(currentUserAtom);
  const queriedOrderStatus = useRecoilValue(queriedOrderStatusSelector);
  const resetQueriedOrder = useResetRecoilState(queriedOrderAtom);
  const resetCurrentOrder = useResetRecoilState(currentOrderAtom);
  const resetTabKey = useResetRecoilState(activeOrderTab);

  const orderAgain = () => {
    resetCurrentOrder();
    resetQueriedOrder();
    resetTabKey();
  };

  return (
    <>
      <StyledSteps
        items={[
          {
            title: "Ordered",
            status: queriedOrderStatus === "ordered" ? "process" : "finish",
            description: "Your order has been received!",
            icon:
              queriedOrderStatus === "ordered" ? (
                <LoadingOutlined />
              ) : (
                <CheckCircleOutlined />
              ),
          },
          {
            title: "In Queue",
            status:
              queriedOrderStatus === "ordered"
                ? "wait"
                : queriedOrderStatus === "inQueue"
                ? "process"
                : "finish",
            description:
              queriedOrderStatus === "ordered"
                ? ""
                : "Your banh-mi is being prepared!",
            icon:
              queriedOrderStatus === "ordered" ? (
                <UnorderedListOutlined />
              ) : queriedOrderStatus === "inQueue" ? (
                <LoadingOutlined />
              ) : (
                <CheckCircleOutlined />
              ),
          },
          {
            title: "Ready",
            status: queriedOrderStatus !== "ready" ? "wait" : "finish",
            description:
              queriedOrderStatus !== "ready" ? "" : "Your banh-mi is ready!",
            icon:
              queriedOrderStatus !== "ready" ? (
                <HourglassOutlined />
              ) : (
                <CheckCircleOutlined />
              ),
          },
        ]}
      />
      {queriedOrderStatus === "ready" && (
        <Result
          status="success"
          title="Thank you for choosing VinFastfood"
          subTitle="We hope you enjoy our banh-mi and we would love to see you again soon on this unique Vietnamese culinary journey!"
          extra={[
            <Button key="buy" type="primary" onClick={orderAgain}>
              Order Again
            </Button>,
            <Button key="console">
              <Link to={`/user/${currentUser?._id}/orders`}>
                View Your Orders
              </Link>
            </Button>,
          ]}
        />
      )}
    </>
  );
};

const StyledSteps = styled(Steps)`
  margin: 40px 0;
`;

export default OrderFinalSteps;
