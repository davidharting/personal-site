import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class Home extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { social } = this.props.data.site.siteMetadata
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[
            ,
            ...[`something`],
            `blog`,
            `gatsby`,
            `javascript`,
            `react`,
          ]}
        />
        <h1>Hi, I'm David Harting 👋</h1>
        <p>I'm a full-stack software developer from Carmel, Indiana.</p>
        <Image
          fluid={data.avatar.childImageSharp.fluid}
          alt="Headshot of David Harting"
          style={{
            borderRadius: '50%',
            maxWidth: 300,
          }}
        />
        <h2>Let's get to know each other 🤝</h2>
        <ul>
          <li>
            Send me an email{' '}
            <a href={`mailto:${social.email}`}>{social.email}</a>
          </li>
          <li>
            Check out my{' '}
            <a href={`http://www.github.com/${social.gitHub}`}>GitHub</a>
          </li>
          <li>
            Say hello on{' '}
            <a href={`https://www.twitter.com/${social.twitter}`}>Twitter</a>
          </li>
          <li>
            Connect with me on{' '}
            <a href={`https://www.linkedin.com/in/${social.linkedIn}`}>
              LinkedIn
            </a>
          </li>
        </ul>
      </Layout>
    )
  }
}

export default Home

export const pageQuery = graphql`
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
    avatar: file(absolutePath: { regex: "/david.jpg/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
