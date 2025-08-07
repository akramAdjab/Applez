function CartProductOptions({ optionsWithoutColorAndModel }) {
  return (
    <p style={{ lineHeight: "1.5" }}>
      {optionsWithoutColorAndModel
        .map((option) => option.value.name)
        .join(", ")}
    </p>
  );
}

export default CartProductOptions;
