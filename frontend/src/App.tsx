import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SandwichList from "./components/sandwich/SandwichList";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sandwiches/" element={<SandwichList />} />
      {/* <Route path="/sandwiches/:sandwichId" element={<SandwichItem />} />
      <Route path="/order/" element={<OrderCreator />} />
      <Route path="/order/all" element={<OrderList />} />
      <Route path="/user/:userId/order" element={<OrderList />} />
      <Route path="/user/:userId/update" element={<User />} /> */}
      </Routes>
    </>
  );
};

export default App;
