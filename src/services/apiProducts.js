import { client } from "./sanity";

export async function sanityProducts(currentSearchCategory) {
  const query = `*[_type == "products" ${
    currentSearchCategory !== "all"
      ? `&& collection->slug.current == "${currentSearchCategory}"`
      : ""
  }]{_id, name, slug, price, collection->{name, slug}, featuredImage}`;

  const products = await client.fetch(query);

  return products;
}

export async function sanityProduct(slug) {}
