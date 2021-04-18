import React from "react";
import { graphql, PageProps } from "gatsby";
import Avatar from "../components/Avatar";
import Emoji from "../components/Emoji";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

// TODO: Generate graphql query types
interface QueryData {
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
      <h1>Hi! I'm David Harting,</h1>
      <p>
        <span>and its a great day to build software</span>
        <Emoji alt="sunshine" emoji="☀️" />
      </p>
      <Avatar />
      <h2>About me</h2>
      <p>
        I'm an experienced, full-stack software engineer from Westfield,
        Indiana, with a focus on web and data.
      </p>
      <p>
        I am happiest working closely with product and design to navigate
        tradeoffs and to ship quickly. I am passionate about code review and
        testing.
      </p>
      <p>
        I have worked in healthcare, an HR tech startup, and now I am at
        Fishtown Analytics, working on a cloud IDE for analytics engineers.
      </p>

      <h2>Let's connect</h2>

      <p>
        <Emoji alt="Shaking hands" emoji="✍️" />
        &nbsp;I{" "}
        <a
          href="https://world.hey.com/david.harting"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>write on Hey World</b>
        </a>
        , and you can find me on{" "}
        <a
          href={`http://www.github.com/${social.gitHub}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        ,{" "}
        <a
          href={`https://www.twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        , and{" "}
        <a
          href={`https://www.linkedin.com/in/${social.linkedIn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
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
  }
`;
