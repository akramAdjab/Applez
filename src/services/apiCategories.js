import { client } from "./sanity";

export async function categories() {
  const categories = await client.fetch(
    `*[_type == "collections"]{_id, name, slug, featuredImage}`
  );
  return categories;
}
