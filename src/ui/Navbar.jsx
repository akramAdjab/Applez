import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import styled, { css } from "styled-components";

import { showHideCart } from "../redux/cartSlice";

const List = styled.ul`
  display: flex;
  gap: var(--space-2);
`;

const StyledNavLink = styled(NavLink)`
  padding-bottom: 0.4rem;
  text-transform: uppercase;

  display: flex;

  ${(props) =>
    props.type === "icon" &&
    css`
      & svg {
        width: var(--space-7);
        height: var(--space-7);
      }

      & svg:last-child {
        width: var(--space-4);
        height: var(--space-4);
      }

      & span {
        font-size: var(--text-2);
      }
    `}

  ${(props) =>
    props.iscurrentlyhomepage === "true"
      ? css`
          &:hover,
          &.active {
            color: var(--color-primary-300);
          }
        `
      : css`
          &:hover,
          &.active {
            color: var(--color-primary-700);
          }
        `}
`;

function Navbar({ type, isCurrentlyHomepage }) {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (type === "icon")
    return (
      <nav>
        <List>
          <StyledNavLink
            type="icon"
            onClick={() => dispatch(showHideCart(true))}
            iscurrentlyhomepage={isCurrentlyHomepage.toString()}
          >
            <HiOutlineShoppingBag />
            <span>{cart.totalQuantity}</span>
          </StyledNavLink>
        </List>
      </nav>
    );

  return (
    <nav>
      <List>
        <StyledNavLink
          to="/products"
          iscurrentlyhomepage={isCurrentlyHomepage.toString()}
        >
          Shop
        </StyledNavLink>
      </List>
    </nav>
  );
}

export default Navbar;
