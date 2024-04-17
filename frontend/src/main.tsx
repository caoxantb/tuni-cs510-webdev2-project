import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Raleway",
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
