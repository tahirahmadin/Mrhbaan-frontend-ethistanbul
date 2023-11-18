const siteUrl = "https://play.onerare.io";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
