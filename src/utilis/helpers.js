import { client } from "../services/sanity";
import imageUrlBuilder from "@sanity/image-url";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export function getCountryFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const countryName = new Intl.DisplayNames(["en"], { type: "region" });

export function urlFor(source) {
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
