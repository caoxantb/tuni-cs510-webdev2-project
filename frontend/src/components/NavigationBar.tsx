import React from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { modalOpenAtom } from "../states/authModalState";
import { currentUserAtom } from "../states/userState";
import { logout } from "../services/user";

import { Layout, Menu, MenuProps, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";

const NavigationBar: React.FC = () => {
  const setModalOpen = useSetRecoilState(modalOpenAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
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
            <Link to={`/user/${currentUser?._id}/orders`}>View your orders</Link>
          ),
        },
        {
          key: "update-user",
          label: (
            <Link to={`/user/${currentUser?._id}/update`}>
              Update your info
            </Link>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: <div>LOGOUT</div>,
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
