module.exports = {
  siteMetadata: {
    title: `David Harting`,
    author: `David Harting`,
    description: `David Harting's website`,
    siteUrl: `https://www.davidharting.com`,
    social: {
      twitter: `davehrtng`,
      linkedIn: `davidharting`,
      gitHub: `davidharting`,
      email: `davidhartingdev@gmail.com`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { path: `${__dirname}/assets/images`, name: `images` },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Harting's personal site`,
        short_name: `David Harting`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00BFFF`,
        display: `minimal-ui`,
        icon: `static/david.jpg`,
      },
    },
    // `gatsby-plugin-offline`, Will have to reinstall to re-enable
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
