import Head from "next/head";
import React from "react";

const Seo = ({ title, description, image, keywords, canonical }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link
        rel="icon"
        href="https://onerare-bucket.s3.ap-south-1.amazonaws.com/assets/images/logo_black.png"
        type="image/x-icon"
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta
        property="og:url"
        content={`https://onerare-next.vercel.app/${canonical}`}
      />
      <meta property="og:site_name" content="OneRare | Food Metaverse" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@onerarenft" />
      {/* <script src="https://platform.onmeta.in/onmeta-sdk.js"></script> */}
    </Head>
  );
};

export default Seo;
