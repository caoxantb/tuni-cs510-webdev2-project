import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";

import NavigationBar from "./components/NavigationBar";
import LoginModal from "./components/auth/AuthModal";
import Home from "./components/Home";
import SandwichList from "./components/sandwich/SandwichList";
import OrderPage from "./components/order/OrderPage";
import OrderList from "./components/order/OrderList";

const App: React.FC = () => {
  useAuth();

  return (
    <>
      <NavigationBar />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandwiches/" element={<SandwichList />} />
        <Route path="/order/" element={<OrderPage />} />
        <Route path="/user/:userId/orders" element={<OrderList />} />
      </Routes>
    </>
  );
};

export default App;
