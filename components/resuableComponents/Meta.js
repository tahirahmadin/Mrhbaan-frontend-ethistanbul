import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "OneRare NFT - Play to Earn",
  description:
    "Claim your favourite recipes by collecting ingredients and combining them. Every recipe is unique and handcrafted.",
  keywords: "play to earn, NFT gaming, blockchain, food NFT, giphy,",
};

export default Meta;
