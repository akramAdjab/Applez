import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { formatCurrency } from "../../utilis/helpers";
import { addToCart } from "../../redux/cartSlice";

import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Price from "../../ui/Price";

const StyledProductDetails = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: var(--space-7);

  @media only screen and (max-width: 50em) {
    padding-left: var(--space-11);
    padding-right: var(--space-11);
  }

  @media only screen and (max-width: 31.25em) {
    padding-left: var(--space-7);
    padding-right: var(--space-7);
  }

  @media only screen and (max-width: 27.5em) {
    padding-left: var(--space-2);
    padding-right: var(--space-2);
  }

  @media only screen and (max-width: 20em) {
    padding-left: 0;
    padding-right: 0;
  }

  button {
    flex: 1;
  }
`;

const DetailsContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-11);
`;

const Details = styled.div`
  h3 {
    margin-bottom: var(--space-6);
    span {
      color: var(--color-grey-500);
    }
  }
`;

const Option = styled.div`
  padding: var(--space-5);
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-lg);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.disabled {
    opacity: 0.7;
  }

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    inset: 0;
  }

  p {
    color: var(--color-grey-500);
  }
`;

function ProductDetails({
  product,
  productId,
  variants,
  price,
  setImgsIndex,
  onAddError,
}) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [additionalPrice, setAdditionalPrice] = useState(0);
  const containerRef = useRef();
  const dispatch = useDispatch();

  const updateSelectedOptions = (variantName, optionId, extraPrice) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [variantName]: { id: optionId, extraPrice },
    }));

    const totalExtraPrice = Object.values(selectedOptions).reduce(
      (sum, option) => sum + (option.extraPrice || 0),
      extraPrice || 0
    );
    setAdditionalPrice(totalExtraPrice);

    if (variantName === "Color") {
      const colorIndex = variants
        .find((v) => v.name === "Color")
        ?.values.findIndex((v) => v._key === optionId);
      setImgsIndex(colorIndex >= 0 ? colorIndex : 0);
    }
  };

  const handleAddToCart = () => {
    const allVariantsSelected = variants.every(
      (variant) => selectedOptions[variant.name]
    );

    if (!allVariantsSelected) {
      onAddError(true);
      return;
    }

    const selectedVariants = variants.map((variant) => ({
      name: variant.name,
      value: variant.values.find(
        (v) => v._key === selectedOptions[variant.name]?.id
      ),
    }));

    const productObj = {
      ...product,
      _id: productId,
      quantity: 1,
      variantOptions: selectedVariants.map((variant) => ({
        name: variant.name,
        value: variant.value,
      })),
    };

    dispatch(addToCart(productObj));
    onAddError(false);
  };

  return (
    <StyledProductDetails>
      <DetailsContainer ref={containerRef}>
        {variants.map((variant) => (
          <Details key={variant._key}>
            <Heading as="h3" className="heading">
              {variant.name}.
            </Heading>
            <Row $direction="column" className="options">
              {variant.values.map((option) => (
                <Option
                  key={option._key}
                  className={
                    selectedOptions[variant.name]?.id === option._key
                      ? ""
                      : "disabled"
                  }
                >
                  <input
                    type="radio"
                    id={option._key}
                    name={variant.name}
                    checked={selectedOptions[variant.name]?.id === option._key}
                    onChange={() =>
                      updateSelectedOptions(
                        variant.name,
                        option._key,
                        option.extraPrice
                      )
                    }
                  />
                  <Heading as="h4">{option.name}</Heading>
                  <p>+{formatCurrency(option.extraPrice)}</p>
                </Option>
              ))}
            </Row>
          </Details>
        ))}
      </DetailsContainer>

      <Row $align="center" $justify="space-between" $gap={5}>
        <Button
          // disabled={isAdding}
          onClick={handleAddToCart}
        >
          {/* {isAdding ? "Adding..." : "Add to cart"} */}
          Add to cart
        </Button>
        <Price>{formatCurrency(price + additionalPrice)}</Price>
      </Row>
    </StyledProductDetails>
  );
}

export default ProductDetails;
