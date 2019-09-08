const path = require('path')

const query = `
query {
  allGoodreadsBook(
    filter: {
      shelfNames: { in: ["read"] }
      review: { readAt: { regex: "/2019-.*/" } }
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

async function createBooksReadByYear({ actions }) {
  const { createPage } = actions

  const firstYear = 2010 // Joined Goodreads
  const thisYear = new Date().getFullYear()
  const template = path.resolve(`./src/templates/year-of-books.js`) // Relative to gastby-node.js

  for (let year = firstYear; year <= thisYear; year++) {
    const previousYear = year === firstYear ? null : year - 1
    const nextYear = year === thisYear ? null : year + 1
    createPage({
      path: `books/${year}`,
      component: template,
      context: {
        year,
        yearRegexString: `/${year}-.*/`,
        previousYear,
        nextYear,
      },
    })
  }
}

module.exports = { createBooksReadByYear }
