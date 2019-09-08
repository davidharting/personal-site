const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createPosts } = require('./create-pages/create-posts')
const {
  createBooksReadByYear,
} = require('./create-pages/create-books-read-by-year')

async function createPages(ctx) {
  await createPosts(ctx)
  return createBooksReadByYear(ctx)
}

exports.createPages = createPages

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: `path`,
      node,
      value: `posts/${value}`,
    })
  }
}
