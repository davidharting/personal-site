module.exports = {
  siteMetadata: {
    title: "David Harting",
    author: "David Harting",
    description: "David Harting's website",
    siteUrl: "https://www.davidharting.com",
    social: {
      twitter: "davehrtng",
      linkedIn: "davidharting",
      gitHub: "davidharting",
      email: "david.harting@hey.com",
    },
  },
  plugins: [
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { path: `./assets/images`, name: "images" },
      __key: "images",
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "David Harting's personal site",
        short_name: "David Harting",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#00BFFF",
        display: "minimal-ui",
        icon: "assets/images/headshot-20200831.jpeg",
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
  ],
};
