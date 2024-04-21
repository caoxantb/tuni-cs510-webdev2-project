import React from "react";
import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import LoginModal from "./components/auth/AuthModal";
import Home from "./components/Home";
import SandwichList from "./components/sandwich/SandwichList";
import OrderPage from "./components/order/OrderPage";

const App: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <LoginModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandwiches/" element={<SandwichList />} />
        <Route path="/order/" element={<OrderPage />} />
        {/* <Route path="/order/all" element={<OrderList />} />
      <Route path="/user/:userId/order" element={<OrderList />} />
      <Route path="/user/:userId/update" element={<User />} /> */}
			</Routes>
		</>
	);
};

export default App;
