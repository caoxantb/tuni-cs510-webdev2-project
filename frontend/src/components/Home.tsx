import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Carousel, Button } from "antd";
import styled from "@emotion/styled";

const Home: React.FC = () => {
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
          <Button ghost>
            <Link to="/sandwiches">View Menu</Link>
          </Button>
          <Button ghost>
            <Link to="/order">Order Here</Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <StyledHomeWrapper>
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
            <StyledHomeSlide>
              {slide.text}
              {slide.children}
            </StyledHomeSlide>
          </div>
        ))}
      </Carousel>
    </StyledHomeWrapper>
  );
};

const StyledHomeWrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/images/home.png) no-repeat center center fixed;
  background-size: cover;
`;

const StyledHomeSlide = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 60px;
  color: #f5f5f5;
  flex-direction: column;

  button {
    margin: 10px;
    font-size: 28px;
    height: auto;
  }
`;

export default Home;
