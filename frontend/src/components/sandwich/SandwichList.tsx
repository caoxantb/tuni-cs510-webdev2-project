import React, { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { sandwichAtom, sandwichSelector } from "../../states/sandwichState";
import { Carousel } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
        <div>
          <Carousel
            autoplay
            pauseOnHover={false}
            dotPosition="right"
            autoplaySpeed={8000}
            speed={1500}
          >
            {sandwiches.contents.map((sandwich: Sandwich) => {
              const names = sandwich.name.match(
                /^([\w\s]+)\s*(?:\(([^)]+)\))?$/
              );

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
                    <h1 style={{ margin: "10px" }}>{names && names[1]}</h1>
                    <h4 style={{ margin: "10px" }}>
                      {names && names[2].toLowerCase().split(" ").join("-")}
                    </h4>
                    <p style={{ fontSize: "20px" }}>{sandwich.description}</p>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <>
          <div
            style={{ textAlign: "center", fontSize: "40px", color: "black", marginTop: "60px" }}
          >
            <img style={{width: "80%"}} src="/big-divider-cropped.svg" />
            <h1 style={{margin: "16px"}}>MENU</h1>
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
            <div style={{ width: "50%", textAlign: "center" }}>
              {sandwiches.contents.map((sandwich: Sandwich) => {
                const names = sandwich.name.match(
                  /^([\w\s]+)\s*(?:\(([^)]+)\))?$/
                );
                return (
                  <div style={{ margin: "24px" }}>
                    <h3 style={{ margin: "8px" }}>
                      {names && names[1].toUpperCase()} - {sandwich.price}
                    </h3>
                    <h4 style={{ margin: "8px" }}>{names && names[2]}</h4>
                    <p style={{ margin: "8px 0 24px 0" }}>
                      {sandwich.originCity}
                    </p>
                    <img
                      style={{ width: "8%" }}
                      src="/horizontal-divider.svg"
                      alt="SVG Image"
                    />
                  </div>
                );
              })}
            </div>
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
                <Marker position={[16.0544, 108.2022]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </>
      </>
    )
  );
};

export default SandwichList;
