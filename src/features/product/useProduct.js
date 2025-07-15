import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { sanityProduct as productApi } from "../../services/apiProducts";

export function useProduct() {
  const { productPermalink } = useParams();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", productPermalink],
    queryFn: () => productApi(productPermalink),
  });

  return { product, isLoadingProduct };
}
