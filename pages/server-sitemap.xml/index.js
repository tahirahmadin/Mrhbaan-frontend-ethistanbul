import { gql } from "@apollo/client";
import axios from "axios";
import { getServerSideSitemap } from "next-sitemap";
import { apolloClient } from "../_app";

export const getServerSideProps = async (ctx) => {
  const getIngredientsData = await axios
    .get("https://api.onerare.io/api/ingredients")
    .then((res) => res.data);
  const getDishesData = await axios
    .get("https://api.onerare.io/api/ingredients")
    .then((res) => res.data);

  const orderBooks = getIngredientsData.map((ingredient) => ({
    loc: `https://play.onerare.io/farmersmarket/${ingredient.tokenId}`,
    lastmod: new Date().toDateString(),
  }));

  const fields = [...dishes, ...orderBooks];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
