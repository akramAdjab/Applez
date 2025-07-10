import { useQuery } from "@tanstack/react-query";
import { sanityProducts as apiProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const currentSearchCategory = searchParams.get("category") || "all";

  const { data: products = {}, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products", currentSearchCategory],
    queryFn: () => apiProducts(currentSearchCategory),
  });

  return { products, isLoadingProducts };
}
