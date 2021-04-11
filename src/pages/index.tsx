import React from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

import Emoji from "../components/Emoji";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

// TODO: Generate graphql query types
interface QueryData {
  avatar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  site: {
    siteMetadata: {
      social: {
        email: string;
        gitHub: string;
        linkedIn: string;
        twitter: string;
      };
      title: string;
    };
  };
}

const Home: React.FC<PageProps<QueryData>> = ({ data }) => {
  const { social } = data.site.siteMetadata;
  return (
    <Layout>
      <Seo />
      <h1>
        Hi, I'm David Harting <Emoji alt="Waving hand" emoji="👋" />
      </h1>
      <p>I'm a full-stack software developer from Westfield, Indiana.</p>
      <GatsbyImage
        alt="Headshot of David Harting"
        image={data.avatar.childImageSharp.gatsbyImageData}
        imgStyle={{ borderRadius: "50%" }}
      />
      <h2>
        Let's get to know each other <Emoji alt="Shaking hands" emoji="🤝" />
      </h2>
      <ul>
        <li>
          Send me an email <a href={`mailto:${social.email}`}>{social.email}</a>
        </li>
        <li>
          Check out my{" "}
          <a href={`http://www.github.com/${social.gitHub}`}>GitHub</a>
        </li>
        <li>
          Say hello on{" "}
          <a href={`https://www.twitter.com/${social.twitter}`}>Twitter</a>
        </li>
        <li>
          Connect with me on{" "}
          <a href={`https://www.linkedin.com/in/${social.linkedIn}`}>
            LinkedIn
          </a>
        </li>
      </ul>
    </Layout>
  );
};

export default Home;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          email
          gitHub
          linkedIn
          twitter
        }
      }
    }
    avatar: file(relativePath: { eq: "headshot-20200831.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 300)
      }
    }
  }
`;
