import React from "react";
import { Layout, Menu, MenuProps, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useRecoilValueLoadable } from "recoil";
import { currentUserSelector } from "../states/userState";

const Navbar: React.FC = () => {
  const currentUser = useRecoilValueLoadable(currentUserSelector);

  const navbarItems: MenuProps["items"] = [
    { key: "sandwiches", label: <Link to="/sandwiches">OUR PRODUCTS</Link> },
    { key: "order", label: <Link to="/order">ORDER HERE</Link> },
  ];

  const loginItem: MenuProps["items"] = [
    { key: "login", label: <div>LOGIN</div> },
  ];

  const userItems: MenuProps["items"] = [
    {
      key: "user-account",
      label: (
        <>
          <Avatar size="large" icon={<UserOutlined />} />
          {currentUser.contents?.username}
        </>
      ),
      children: [
        {
          key: "all-orders",
          label: <Link to={`/user/${currentUser.contents?._id}/order`}>View your orders</Link>,
        },
        {
          key: "update-user",
          label: <Link to={`/user/${currentUser.contents?._id}/update`}>Update your info</Link>,
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: <div>LOGOUT</div>,
        },
      ],
    },
  ];

  return (
    <Layout.Header style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <Link to="/">
          <img
            style={{ height: "calc(100% - 20px)", padding: "10px" }}
            src="/logo.svg"
          />
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
        items={
          currentUser.state === "hasValue" && currentUser.contents
            ? userItems
            : loginItem
        }
        disabledOverflow
        selectable={false}
      />
    </Layout.Header>
  );
};

export default Navbar;
