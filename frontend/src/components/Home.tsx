import { Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import React, { ReactNode } from "react";

const Home: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "60px",
    color: "#f5f5f5",
    flexDirection: "column",
  };

  const carouselSlides: { text: string; children?: ReactNode }[] = [
    { text: "Craving for that simple taste of a Banh Mi?" },
    { text: "Seeking those familiar flavors of good ol' memories?" },
    { text: "Well... we kinda don't do that here." },
    {
      text: "At VinFastfood, we put a twist on the traditional Banh Mi experience.",
    },
    {
      text: "Join us for a journey through Vietnam's culinary tapestry, where bold flavors redefine tradition.",
      children: (
        <div>
          <Button
            ghost
            style={{ margin: "10px", fontSize: "28px", height: "auto" }}
          >
            <Link to="/sandwiches">View Menu</Link>
          </Button>
          <Button
            ghost
            style={{ margin: "10px", fontSize: "28px", height: "auto" }}
          >
            <Link to="/order">Order Here</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(https://images.squarespace-cdn.com/content/v1/6018fa5163f068434d5dc5d1/1612690759381-UX9W43NGVSFCJDFFTHNL/Bahn+Mi+thumbnail.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <Carousel
        pauseOnHover={false}
        effect="fade"
        autoplay
        autoplaySpeed={3000}
        speed={1500}
        infinite={false}
        dots={false}
      >
        {carouselSlides.map((slide, idx) => (
          <div key={`slide-${idx}`}>
            <div style={contentStyle}>
              {slide.text}
              {slide.children}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
