import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";

import { formatCurrency, urlFor } from "../../utilis/helpers";
import { removeFromCart, updateCartItem } from "../../redux/cartSlice";

import Heading from "../../ui/Heading";
import Price from "../../ui/Price";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CartProductOptions from "./CartProductOptions";

function CartItem({ product, smallScreens }) {
  // Distracturing the product object
  const {
    _id: productId,
    quantity,
    name,
    itemTotal,
    variantOptions: options,
  } = product;

  const dispatch = useDispatch();

  // Getting all the informations about the COLOR option from the product object by looping over the array of options
  const optionColor = options.find((option) => option.name === "Color");

  // Getting all the informations about the REST OF options from the product object by looping over the array of options
  const optionsWithoutColorAndModel = options.filter(
    (option) => option.name !== "Color"
  );

  // Using state for updating the quantity to UI before FETCHING
  const [quantityState, setQuantityState] = useState(quantity);

  function handleDec() {
    // Remove product from the cart
    if (quantityState <= 1) {
      console.log("entered");
      setQuantityState(1);
      dispatch(removeFromCart({ _id: productId, variantOptions: options }));
    } else {
      // 1. Update the state
      setQuantityState((quantity) => (quantity -= 1));
      // 2, Update the product quantity
      dispatch(
        updateCartItem({
          _id: productId,
          variantOptions: options,
          quantity: quantityState - 1,
        })
      );
    }
  }

  function handleInc() {
    // 1. Update the state
    setQuantityState((quantity) => (quantity += 1));
    // 2, Update the product quantity
    dispatch(
      updateCartItem({
        _id: productId,
        variantOptions: options,
        quantity: quantityState + 1,
      })
    );
  }

  return (
    <>
      <Row $direction="column">
        <Heading
          as="h4"
          data-cursor-img={
            !smallScreens
              ? `${urlFor(optionColor.value.optionimages.at(0))}`
              : ""
          }
        >
          {name}, {optionColor.value.name}
        </Heading>
        {smallScreens && (
          <>
            <CartProductOptions
              optionsWithoutColorAndModel={optionsWithoutColorAndModel}
            />
            <Price>{formatCurrency(itemTotal)}</Price>
          </>
        )}
      </Row>

      {/* Product options in large screens */}
      {!smallScreens && (
        <CartProductOptions
          optionsWithoutColorAndModel={optionsWithoutColorAndModel}
        />
      )}

      <Row $align="center" className="cart-quantity">
        <Button $variation="secondary" $size="small" onClick={handleDec}>
          <HiOutlineMinus />
        </Button>
        <p>{quantityState}</p>
        <Button $variation="secondary" $size="small" onClick={handleInc}>
          <HiOutlinePlus />
        </Button>
      </Row>
      {!smallScreens && <Price>{formatCurrency(itemTotal)}</Price>}
    </>
  );
}

export default CartItem;
