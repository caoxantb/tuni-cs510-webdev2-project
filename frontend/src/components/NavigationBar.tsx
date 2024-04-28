import React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalOpenAtom } from "../states/authModalState";
import { currentUserAtom } from "../states/userState";
import { logout } from "../services/user";

import { Layout, Menu, MenuProps, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import { currentUserOrdersAtom } from "../states/orderState";

const NavigationBar: React.FC = () => {
  const setModalOpen = useSetRecoilState(modalOpenAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const setAllOrder = useSetRecoilState(currentUserOrdersAtom);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAllOrder([]);
  };

  const navbarItems: MenuProps["items"] = [
    { key: "sandwiches", label: <Link to="/sandwiches">OUR PRODUCTS</Link> },
    { key: "order", label: <Link to="/order">ORDER HERE</Link> },
  ];

  const loginItem: MenuProps["items"] = [
    {
      key: "login",
      label: <div>LOGIN</div>,
      onClick: () => setModalOpen(true),
    },
  ];

  const userItems: MenuProps["items"] = [
    {
      key: "user-account",
      label: (
        <>
          <Avatar size="large" icon={<UserOutlined />} />
          <span style={{ marginLeft: "8px" }}>{currentUser?.username}</span>
        </>
      ),
      children: [
        {
          key: "all-orders",
          label: (
            <Link to={`/user/${currentUser?._id}/orders`}>
              View your orders
            </Link>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: <Link to="/">LOGOUT</Link>,
          onClick: () => handleLogout(),
        },
      ],
    },
  ];

  return (
    <StyledNavbar>
      <div className="navigation-bar">
        <Link to="/">
          <img className="logo" src="/logo.svg" />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          items={navbarItems}
          disabledOverflow
          selectable={false}
        />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={currentUser ? userItems : loginItem}
        disabledOverflow
        selectable={false}
      />
    </StyledNavbar>
  );
};

const StyledNavbar = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;

  .navigation-bar {
    display: flex;
  }

  .logo {
    height: calc(100% - 20px);
    padding: 10px;
  }
`;

export default NavigationBar;
