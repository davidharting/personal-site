'use strict'

const fs = require('fs')
const markdown = require('metalsmith-markdown')
const layouts = require('metalsmith-layouts')
const cleanCss = require('metalsmith-clean-css')
const Metalsmith = require('metalsmith')
const discoverPartials = require('metalsmith-discover-partials')

const site = Metalsmith(__dirname)
  .source('./src')
  .destination('./public')
  .clean(true)
  .use(markdown())
  .use(discoverPartials())
  .use(layouts({ engine: 'handlebars' }))
  .use(cleanCss())


site.build(function handleError(error) {
  if (error) {
    throw error
  }
})

