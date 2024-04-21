import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCities } from "../../helpers/sandwich-utils";

import styled from "@emotion/styled";

const SandwichMap: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  return (
    <StyledSandwichMenuWrapper>
      <StyledMapContainer
        center={[16.0544, 106.1022]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getCities(sandwiches.contents).map(city => (
          <Marker key={city.name} position={[city.lat, city.lon]}>
            <Popup>
              {city.sandwiches.map(sandwich => (
                <div>
                  <img
                    src={`/images${sandwich.image}`}
                    width="100%"
                    alt={sandwich.name}
                  />
                  <h3>{sandwich.name}</h3>
                </div>
              ))}
            </Popup>
          </Marker>
        ))}
      </StyledMapContainer>
    </StyledSandwichMenuWrapper>
  );
};

const StyledSandwichMenuWrapper = styled.div`
  width: 50%;
`;

const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 1700px;
`;

export default SandwichMap;
