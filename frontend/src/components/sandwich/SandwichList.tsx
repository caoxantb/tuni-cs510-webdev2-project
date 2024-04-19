import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";

import SandwichMenu from "./SandwichMenu";
import SandwichMap from "./SandwichMap";
import SandwichSlider from "./SandwichSlider";

const SandwichList: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  return (
    sandwiches.state === "hasValue" && (
      <>
        <SandwichSlider />
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            color: "black",
            marginTop: "60px",
            padding: "0 10%",
          }}
        >
          <img style={{ width: "100%" }} src="/big-divider-cropped.svg" />
          <h1 style={{ margin: "8px" }}>MENU</h1>
          <p
            style={{ fontSize: "20px", fontStyle: "italic", padding: "0 25%" }}
          >
            My love affair with Vietnamese cuisine began in my childhood, and to
            this day, it remains a journey of discovery, a tapestry of tastes,
            and an endless inspiration for culinary creativity." <br /> - Luke
            Nguyen
          </p>
        </div>
        <div
          style={{
            display: "flex",
            padding: "0 10%",
            margin: "20px",
            gap: "20px",
            color: "black",
          }}
        >
          <SandwichMenu />
          <SandwichMap />
        </div>
      </>
    )
  );
};

export default SandwichList;
