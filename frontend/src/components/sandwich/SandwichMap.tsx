import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { sandwichSelector } from "../../states/sandwichState";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCities } from "../../helpers/sandwich-utils";

import styled from "@emotion/styled";

const SandwichMap: React.FC = () => {
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

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
                <div key={sandwich._id}>
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
