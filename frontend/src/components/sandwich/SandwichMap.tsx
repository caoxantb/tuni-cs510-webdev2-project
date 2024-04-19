import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCities } from "../../helpers/sandwich-utils";

const SandwichMap: React.FC = () => {
  const setSandwichState = useSetRecoilState(sandwichAtom);
  const sandwiches = useRecoilValueLoadable(sandwichSelector);

  useEffect(() => {
    if (sandwiches.state === "hasValue") {
      setSandwichState(sandwiches.contents);
    }
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <MapContainer
        style={{ width: "100%", height: "1700px" }}
        center={[16.0544, 106.1022]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {getCities(sandwiches.contents).map((city) => (
          <Marker key={city.name} position={[city.lat, city.lon]}>
            <Popup>
              {city.sandwiches.map((sandwich) => (
                <div>
                  <img src={`/images${sandwich.image}`} width="100%" alt={sandwich.name} />
                  <h3>{sandwich.name}</h3>
                </div>
              ))}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SandwichMap;
