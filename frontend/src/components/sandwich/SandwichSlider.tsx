import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import { Carousel } from "antd";
import { parseSandwichName } from "../../helpers/sandwich-utils";

const SandwichSlider: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  return (
    <Carousel
      autoplay
      pauseOnHover={false}
      dotPosition="right"
      autoplaySpeed={8000}
      speed={1500}
    >
      {sandwiches.contents.map((sandwich: Sandwich) => {
        const {name, vietnameseName} = parseSandwichName(sandwich.name);

        return (
          <div key={sandwich._id}>
            <div
              style={{
                display: "flex",
                height: "100%",
                minHeight: "100vh",
                padding: "0 10%",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                color: "#f5f5f5",
                fontSize: "32px",
                flexDirection: "column",
                background: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),url(/images${sandwich.image}) no-repeat center center fixed`,
                backgroundSize: "cover",
              }}
            >
              <h1 style={{ margin: "10px" }}>{name}</h1>
              <h4 style={{ margin: "10px" }}>
                {vietnameseName.toLowerCase().split(" ").join("-")}
              </h4>
              <p style={{ fontSize: "20px" }}>{sandwich.description}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default SandwichSlider;
