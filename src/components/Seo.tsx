import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const Seo: React.FC = () => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const { title, description } = data.site.siteMetadata;
        return (
          <Helmet>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta property="og:title" content="title" />
            <meta property="og:description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.author}
            />
            <meta name="twitter:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.author}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
          </Helmet>
        );
      }}
    />
  );
};

export default Seo;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
