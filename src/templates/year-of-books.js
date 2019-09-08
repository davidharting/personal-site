import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

const THIS_YEAR = new Date().getFullYear()

function Header({ year }) {
  if (year === THIS_YEAR) {
    return <h1>What I have read so far in {year}</h1>
  }
  return <h1>What I read in {year}</h1>
}

function YearOfBooks({ pageContext, data }) {
  const { nextYear, previousYear, year } = pageContext
  return (
    <Layout>
      <Header year={year} />
      <p>{JSON.stringify(data, null, 2)}</p>
      {/* Abstract this way of doing nextYear / previousYear linking? This is copy-paste from Post template */}
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previousYear && (
            <Link to={`books/${previousYear}`} rel="prev">
              ← {previousYear}
            </Link>
          )}
        </li>
        <li>
          {nextYear && (
            <Link to={`books/${nextYear}`} rel="next">
              {nextYear} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default YearOfBooks

export const pageQuery = graphql`
  query BooksByYear($yearRegexString: String!) {
    allGoodreadsBook(
      filter: {
        shelfNames: { in: ["read"] }
        review: { readAt: { regex: $yearRegexString } }
      }
    ) {
      edges {
        node {
          id
          shelfNames
          book {
            title
            authors {
              name
            }
          }
          review {
            readAt
          }
        }
      }
    }
  }
`
