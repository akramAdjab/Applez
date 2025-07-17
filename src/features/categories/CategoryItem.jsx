import { Link } from "react-router-dom";
import styled from "styled-components";

import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { urlFor } from "../../utilis/helpers";

const Category = styled.div`
  height: 60rem;
  overflow: hidden;

  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: var(--color-primary-950);
    opacity: 0.3;
    transition: all 0.2s;

    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover::before {
    opacity: 0.5;
  }

  &:hover h3 {
    transform: translate(-50%, -50%) rotate(-90deg) scale(1.1);
  }

  & img {
    height: 100%;
  }

  & h3 {
    width: 100%;
    color: var(--color-primary-50);
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.2s;

    transform: translate(-50%, -50%) rotate(-90deg);
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;

function CategoryItem({ category, buttons }) {
  const {
    name,
    slug: { current: slug },
    featuredImage,
  } = category;

  if (buttons) return <Button>{name}</Button>;

  return (
    <Link to={`/products?category=${slug}`}>
      <Category>
        <img
          src={urlFor(featuredImage)}
          alt={featuredImage.alt}
          loading="lazy"
        />
        <Heading as="h3">{name}</Heading>
      </Category>
    </Link>
  );
}

export default CategoryItem;
