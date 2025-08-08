import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showHideCart } from "../../redux/cartSlice";
import styled, { css } from "styled-components";

import { formatCurrency } from "../../utilis/helpers";

import CartItem from "./CartItem";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import Price from "../../ui/Price";
import Message from "../../ui/Message";

const StyledCartDetails = styled.div`
  /* margin-top: var(--space-13); */
  ${(props) =>
    props.$cartPage
      ? css`
          margin-top: var(--space-0);
        `
      : css`
          margin-top: var(--space-13);
        `}
  padding-bottom: var(--space-9);

  display: flex;
  flex-direction: column;

  & .table-products-container {
    overflow-y: scroll;
  }
`;

const TableRow = styled.div`
  padding: var(--space-6);

  display: grid;
  grid-template-columns: 40% 27% 23% 10%;

  @media only screen and (max-width: 56.25em) {
    & {
      grid-template-columns: 70% 25%;
      gap: var(--space-5);
    }
  }

  @media only screen and (max-width: 18.75em) {
    & {
      grid-template-columns: 65% 25%;
      gap: var(--space-3);
    }
  }
`;

const TableBody = styled.div`
  padding: var(--space-6);

  position: relative;

  display: grid;
  grid-template-columns: 40% 27% 23% 10%;
  align-items: center;

  @media only screen and (max-width: 56.25em) {
    & {
      grid-template-columns: 70% 25%;
      gap: var(--space-5);
    }
  }

  @media only screen and (max-width: 18.75em) {
    & {
      grid-template-columns: 65% 25%;
      gap: var(--space-3);
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }

  & img {
    width: 8rem;
    height: 8rem;
    border-radius: var(--border-radius-lg);
    opacity: 0;
    transition: all 0.3s;
    transform: scale(0.8);

    position: absolute;
    left: 0;
  }

  & h4 {
    /* margin-left: 7.4rem; */
    margin-left: 0rem;
    transition: all 0.2s;
  }

  /* HOVER ANIMATION */
  /* &:hover img {
    opacity: 1;
    transform: scale(1);
  } */

  &:hover h4 {
    /* margin-left: 7.4rem; */
    /* margin-left: 0rem; */
  }
`;

const StyledRow = styled(Row)`
  margin-top: auto;
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-grey-300);

  @media only screen and (max-width: 31.25em) {
    & {
      flex-direction: column;
      gap: var(--space-9);
    }

    & div:first-of-type {
      justify-content: space-between;
    }

    & div:last-of-type {
      justify-content: space-between;

      & button {
        flex: 1;
      }
    }
  }

  @media only screen and (max-width: 18.75em) {
    & div:last-of-type {
      & button {
        font-size: var(--text-1);
      }
    }
  }
`;

const StyledMessage = styled(Message)`
  @media only screen and (max-width: 43.75em) {
    & {
      width: 100%;
      font-size: var(--text-3);
    }
  }

  @media only screen and (max-width: 37.5em) {
    & {
      margin-top: var(--space-9);
    }
  }
`;

function CartDetails({ cartPage }) {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  // const { cart, isLoadingCart } = useCart();
  // const { cartToEmpty, isEmptyingCart } = useCartToEmpty();

  const mediaQuery = window.matchMedia("(max-width: 56.25em)");
  const smallScreens = mediaQuery.matches;

  // HANDLER FUNCTIONS
  function handleEmptyCart() {
    // cartToEmpty();
    // dispatch(showHideCart());
  }

  function handleNavigate() {
    navigate("/checkout");
    dispatch(showHideCart());
  }

  function handleBackToShop() {
    navigate("/products");
    dispatch(showHideCart(false));
  }

  // if loading data
  // if (isLoadingCart) return <SpinnerMini margin={8} width={5.6} />;

  // if the cart is empty
  if (!cart.items.length)
    return (
      <Row
        $direction="column"
        $align={cartPage ? "center" : "flex-start"}
        $gap={7}
      >
        <StyledMessage $textAlign={cartPage}>
          Your cart is lonely! Add favorites for a seamless shopping experience.
          Explore deals now. Happy shopping! 🛍️
        </StyledMessage>
        <Button onClick={handleBackToShop}>Back to shop</Button>
      </Row>
    );

  // if cart is NOT empty
  return (
    <>
      <StyledCartDetails $cartPage={cartPage} role="table">
        <TableRow className="table-head" role="row">
          <p>Product</p>
          {!smallScreens && <p>Specs</p>}
          <p>Quantity</p>
          {!smallScreens && <p>Price</p>}
        </TableRow>

        <div className="table-products-container">
          {cart.items.map((item, i) => (
            <TableBody role="row" key={`${item._id}--${i}`}>
              <CartItem product={item} smallScreens={smallScreens} />
            </TableBody>
          ))}
        </div>
      </StyledCartDetails>

      <StyledRow $align="center" $justify="space-between">
        <Row $align="baseline">
          <Heading as="h3">
            <span>Total price:</span>
          </Heading>
          <Price $size={4}>{formatCurrency(cart.subtotal)}</Price>
        </Row>

        <Row $justify="flex-end">
          <Button $variation="danger" onClick={handleEmptyCart}>
            Empty your cart
          </Button>
          <Button onClick={handleNavigate}>Checkout</Button>
        </Row>
      </StyledRow>
    </>
  );
}

export default CartDetails;
