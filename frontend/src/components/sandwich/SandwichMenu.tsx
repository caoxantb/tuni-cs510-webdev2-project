import React from "react";
import { useRecoilValueLoadable} from "recoil";
import { sandwichSelector } from "../../states/sandwichState";
import { parseSandwichName } from "../../helpers/sandwich-utils";
import styled from "@emotion/styled";

const SandwichMenu: React.FC = () => {
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  return (
    <StyledSandwichMenuWrapper>
      {sandwiches.contents.map((sandwich: Sandwich, idx: number) => {
        const { name, vietnameseName } = parseSandwichName(sandwich.name);

        return (
          <StyledSandwichDiv key={sandwich._id}>
            <h3>
              {name.toUpperCase()} - {sandwich.price}
            </h3>
            <h4>{vietnameseName}</h4>
            <p>{sandwich.originCity}</p>
            {idx !== sandwiches.contents.length - 1 && (
              <img src="/horizontal-divider.svg" alt="SVG Image" />
            )}
          </StyledSandwichDiv>
        );
      })}
    </StyledSandwichMenuWrapper>
  );
};

const StyledSandwichMenuWrapper = styled.div`
  width: 50%;
  text-align: center;
`;

const StyledSandwichDiv = styled.div`
  margin: 24px;

  h3 {
    margin: 8px;
  }

  h4 {
    margin: 8px;
  }

  p {
    margin: 8px 0 24px 0;
  }

  img {
    width: 8%;
  }
`;

export default SandwichMenu;
