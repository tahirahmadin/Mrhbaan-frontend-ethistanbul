import React from "react";

let siteUrl = "https://play.onerare.io";
const createSitemap = (posts) =>
  `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.google.com/schemas/sitemap/0.84">
      
        <sitemap>
            <loc>${siteUrl}/sitemaps/recipes_sitemap.xml</loc>
            <lastmod>2022-09-05</lastmod>
        </sitemap>
        <sitemap>
        <loc>${siteUrl}/sitemaps/leaderboard.xml</loc>
        <lastmod>2022-09-05</lastmod>
        </sitemap>

        </sitemapindex>
    `;

class Sitemap extends React.Component {}
export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap());
  res.end();
}

export default Sitemap;
