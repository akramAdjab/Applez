import { useCategories } from "./useCategories";

import CategoriesBoxesContainer from "../../ui/CategoriesBoxesContainer";
import Loading from "../../ui/Loading";
import CategoryItem from "./CategoryItem";
import CategoriesButtons from "./CategoriesButtons";

function Categories({ type }) {
  const { categories, isLoadingCategories } = useCategories();

  if (isLoadingCategories)
    return <Loading type={type ? type : "categoriesBoxes"} length={7} />;

  if (type) return <CategoriesButtons categories={categories} />;

  return (
    <CategoriesBoxesContainer $length={categories?.length}>
      {categories?.map((category) => (
        <CategoryItem category={category} key={category._id} />
      ))}
    </CategoriesBoxesContainer>
  );
}

export default Categories;
