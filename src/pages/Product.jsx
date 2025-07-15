import { useProduct } from "../features/product/useProduct";

import ProductItem from "../features/product/ProductItem";
import SectionWithTitle from "../ui/SectionWithTitle";
import Loading from "../ui/Loading";

function Product() {
  const { product, isLoadingProduct } = useProduct();

  if (isLoadingProduct) return <Loading type="product" />;

  return (
    <SectionWithTitle
      shadowTitle={product?.collection?.name}
      mainTitle={product?.name}
      full={true}
    >
      <ProductItem product={product} />
    </SectionWithTitle>
  );
}

export default Product;
