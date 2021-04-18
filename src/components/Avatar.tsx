import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface Query {
  avatar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

const Avatar: React.FC = () => {
  const { avatar } = useStaticQuery<Query>(graphql`
    query {
      avatar: file(relativePath: { eq: "headshot-20200831.jpeg" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 300)
        }
      }
    }
  `);

  return (
    <GatsbyImage
      alt="Headshot of David Harting"
      image={avatar.childImageSharp.gatsbyImageData}
      imgStyle={{ borderRadius: "50%" }}
    />
  );
};

export default Avatar;
