import styled, { css } from "styled-components";

const Heading = styled.h1`
  color: var(--color-primary-950);

  ${(props) =>
    props.$lightcolor === "true" &&
    css`
      color: #f7fbff;
    `}

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: var(--text-11);
      font-weight: var(--weight-4);
    `}

    @media only screen and (max-width: 53.25em) {
    ${(props) =>
      props.as === "h1" &&
      css`
        font-size: var(--text-8);
      `}
  }

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: var(--text-7);
      font-weight: var(--weight-4);
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: var(--text-4);
      font-weight: var(--weight-4);
      white-space: nowrap;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: var(--text-3);
      font-weight: var(--weight-3);
      line-height: 1.5;
    `}

  ${(props) =>
    props.color === "lightDark" &&
    css`
      color: var(--color-grey-700);
    `}
`;

Heading.defaultProps = {
  $lightcolor: "var(--color-primary-950)",
};

export default Heading;
