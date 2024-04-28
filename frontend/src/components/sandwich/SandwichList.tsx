import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";

import SandwichMenu from "./SandwichMenu";
import SandwichMap from "./SandwichMap";
import SandwichSlider from "./SandwichSlider";

import styled from "@emotion/styled";

const SandwichList: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, [sandwiches]);

  return (
    sandwiches.state === "hasValue" && (
      <>
        <SandwichSlider />
        <StyledSandwichMetaHeader>
          <img src="/big-divider-cropped.svg" />
          <h1>MENU</h1>
          <p>
            My love affair with Vietnamese cuisine began in my childhood, and to
            this day, it remains a journey of discovery, a tapestry of tastes,
            and an endless inspiration for culinary creativity." <br /> - Luke
            Nguyen
          </p>
        </StyledSandwichMetaHeader>
        <StyledSandwichMeta>
          <SandwichMenu />
          <SandwichMap />
        </StyledSandwichMeta>
      </>
    )
  );
};

const StyledSandwichMetaHeader = styled.div`
  text-align: center;
  font-size: 40px;
  color: black;
  margin-top: 60px;
  padding: 0 10%;

  img {
    width: 100%;
  }

  h1 {
    margin: 8px;
  }

  p {
    font-size: 20px;
    font-style: italic;
    padding: 0 25%;
    margin: 8px 0 16px 0;
  }
`;

const StyledSandwichMeta = styled.div`
  display: flex;
  padding: 0 10%;
  margin: 20px;
  gap: 20px;
  color: black;
`;

export default SandwichList;
