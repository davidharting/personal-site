if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

if (!process.env.GOODREADS_API_KEY) {
  throw new Error('Missing required environment variable GOODREADS_API_KEY')
}

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
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
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
    {
      resolve: `@halkeye/gatsby-source-goodreads`,
      options: {
        developerKey: process.env.GOODREADS_API_KEY, // 'Y8SJCxmbz6yLdC4IRUMxIw'
        goodReadsUserId: '5041981-david-harting',
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Harting's personal site`,
        short_name: `David Harting`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/david.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
