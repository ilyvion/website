import React from "react"
import Helmet from "react-helmet"
import renderer from "react-test-renderer"
import { shallow, mount, render } from "enzyme"

import { PureSEO } from "../seo"

const siteTitle = "Site Title"
const siteDescription = "Site Description"
const siteAuthor = "Site Author"
const pageTitle = "Page Title"
const pageDescription = "Page Description"
const pageLang = "nb"

const data = {
  site: {
    siteMetadata: {
      title: siteTitle,
      description: siteDescription,
      author: siteAuthor,
    },
  },
}

describe("SEO", () => {
  it("sets expected default values", () => {
    mount(<PureSEO title={pageTitle} site={data.site} />)
    const helmet = Helmet.peek()

    expect(helmet.htmlAttributes.lang).toBe(PureSEO.defaultProps.lang)
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { name: "description", content: siteDescription },
      ]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([{ property: "og:title", content: pageTitle }]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { property: "og:description", content: siteDescription },
      ]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([{ property: "og:type", content: "website" }]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([{ name: "twitter:card", content: "summary" }]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { name: "twitter:creator", content: siteAuthor },
      ]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([{ name: "twitter:title", content: pageTitle }]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { name: "twitter:description", content: siteDescription },
      ]),
    )
    expect(helmet.title).toBe("Page Title | Site Title")
  })

  it("overrides description", () => {
    mount(
      <PureSEO
        title={pageTitle}
        description={pageDescription}
        site={data.site}
      />,
    )
    const helmet = Helmet.peek()
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { name: "description", content: pageDescription },
      ]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { property: "og:description", content: pageDescription },
      ]),
    )
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        { name: "twitter:description", content: pageDescription },
      ]),
    )
  })

  it("overrides lang", () => {
    mount(<PureSEO title={pageTitle} lang={pageLang} site={data.site} />)
    const helmet = Helmet.peek()
    expect(helmet.htmlAttributes.lang).toBe(pageLang)
  })

  it("adds additional meta tags", () => {
    const extraMetaValue = { name: "extra", content: "value" }
    mount(
      <PureSEO title={pageTitle} site={data.site} meta={[extraMetaValue]} />,
    )
    const helmet = Helmet.peek()
    expect(helmet.metaTags).toEqual(expect.arrayContaining([extraMetaValue]))
  })
})
