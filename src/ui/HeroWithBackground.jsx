import { HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";

import Heading from "./Heading";
import ButtonLink from "./ButtonLink";

const StyledHero = styled.div`
  height: 90dvh;
  background-image: url("/assets/iPhone_15_Pro_background.jpg");
  background-size: cover;
  background-position: top;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @media only screen and (max-width: 31.25em) {
    & {
      background-image: url("/assets/iPhone_15_Pro_background_small.jpeg");
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);

  transform: translate(-50%, -50%);
  position: absolute;
  top: 34%;
  left: 50%;

  @media only screen and (max-width: 37.5em) {
    & {
      width: 100%;
    }
  }

  @media only screen and (max-width: 31.25em) {
    & {
      top: 28.5%;
    }
  }
`;

function HeroWithBackground({ path, mainTitle, subTitle, buttonTitle }) {
  return (
    <StyledHero $path={path} data-cursor="-inverse">
      <Box>
        <Heading as="h1" $lightcolor="true">
          {mainTitle}
        </Heading>

        <p className="para-light" style={{ marginBottom: "var(--space-5)" }}>
          {subTitle}
        </p>

        <ButtonLink to="/product/iphone-16-pro" lightcolor="true">
          <span>{buttonTitle}</span>
          <HiChevronRight />
        </ButtonLink>
      </Box>
    </StyledHero>
  );
}

export default HeroWithBackground;
