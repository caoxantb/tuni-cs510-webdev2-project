import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import { parseSandwichName } from "../../helpers/sandwich-utils";

const SandwichMenu: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  return (
    <div style={{ width: "50%", textAlign: "center" }}>
      {sandwiches.contents.map((sandwich: Sandwich) => {
        const { name, vietnameseName } = parseSandwichName(sandwich.name);

        return (
          <div key={sandwich._id} style={{ margin: "24px" }}>
            <h3 style={{ margin: "8px" }}>
              {name.toUpperCase()} - {sandwich.price}
            </h3>
            <h4 style={{ margin: "8px" }}>{vietnameseName}</h4>
            <p style={{ margin: "8px 0 24px 0" }}>{sandwich.originCity}</p>
            <img
              style={{ width: "8%" }}
              src="/horizontal-divider.svg"
              alt="SVG Image"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SandwichMenu;
