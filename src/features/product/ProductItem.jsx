import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";

import { toggleIntroVideo } from "../../redux/introVideoSlice";

import ProductDetails from "./ProductDetails";
import ProductGallery from "./ProductGallery";
import StyledProduct from "../../ui/StyledProduct";
import ErrorMessage from "../../ui/ErrorMessage";

const ShowTrailer = styled.div`
  color: var(--color-primary-50);
  width: 50%;
  height: 0;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  transform: translateX(-50%);
  position: sticky;
  bottom: var(--space-5);
  left: 50%;

  @media only screen and (max-width: 50em) {
    & {
      width: 100%;
      height: var(--space-13);
      opacity: 1;
      user-select: auto;
      pointer-events: auto;

      transform: translateX(0);
      left: 0;
    }
  }

  & button {
    border: none;
    border-radius: 99rem;

    & span {
      z-index: 2;
      position: relative;
    }
  }

  & button:first-of-type {
    width: 20rem;
    height: var(--space-13);
    background-color: var(--color-primary-950);
  }

  & button:last-of-type {
    width: var(--space-13);
    height: var(--space-13);
    background-color: var(--color-primary-950);
    overflow: hidden;

    position: relative;

    & svg {
      font-size: var(--text-4);
    }

    &::before {
      content: "";
      width: 150%;
      height: 150%;
      border-radius: 50%;
      background-color: var(--color-secondary-600);
      filter: blur(2rem);
      opacity: 0;
      transition: 0.2s;

      display: block;

      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`;

function ProductItem({ product }) {
  const [imgsIndex, setImgsIndex] = useState(0);
  const [errorAddToCart, setErrorAddToCart] = useState(false);
  const [showTrailerContainer, setShowTrailerContainer] = useState(true);
  const containerRef = useRef();
  const buttonRef = useRef();
  const dispatch = useDispatch();

  const availableProductTrailers = [
    "iPhone_15_Pro",
    "iPhone_15",
    "MacBook_Air",
    "MacBook_Pro",
    "AirPods_Pro_(2nd_Gen)",
  ];

  // useEffect(function () {
  //   const mediaQuery = window.matchMedia("(max-width: 50em)");

  //   if (mediaQuery.matches) return;

  //   const element = containerRef.current;
  //   const buttonContainer = buttonRef.current;

  //   const observerFunction = function (entries) {
  //     const [entry] = entries;

  //     if (entry.isIntersecting) {
  //       buttonContainer?.classList.add("show-animation");
  //     } else {
  //       buttonContainer?.classList.remove("show-animation");
  //     }
  //   };

  //   const observerOptions = {
  //     root: null,
  //     threshold: 0.6,
  //   };

  //   const observer = new IntersectionObserver(
  //     observerFunction,
  //     observerOptions
  //   );

  //   observer.observe(element);
  // });

  const { _id: id, variantOptions: variants, price } = product;

  function handleShowHideBtnContainer() {
    setShowTrailerContainer((show) => !show);
  }

  return (
    <>
      <StyledProduct ref={containerRef}>
        <ProductGallery variants={variants} imgsIndex={imgsIndex} />

        <ProductDetails
          product={product}
          productId={id}
          variants={variants}
          price={price}
          setImgsIndex={setImgsIndex}
          onAddError={setErrorAddToCart}
        />

        {errorAddToCart && (
          <ErrorMessage>Please select the missing option!</ErrorMessage>
        )}
      </StyledProduct>

      {showTrailerContainer &&
        availableProductTrailers.includes(
          product.name.replaceAll(" ", "_")
        ) && (
          <ShowTrailer ref={buttonRef} className="show-animation">
            <button
              className="animated-background animated-background--small"
              onClick={() =>
                dispatch(toggleIntroVideo(name.slice().replaceAll(" ", "_")))
              }
            >
              <span>Show trailer video</span>
            </button>
            <button onClick={handleShowHideBtnContainer}>
              <span>
                <HiOutlineXMark />
              </span>
            </button>
          </ShowTrailer>
        )}
    </>
  );
}

export default ProductItem;
