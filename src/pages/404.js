import React from "react"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section from "@components/Section"

const FourOhFour = ({ path }) => (
  <Layout path={path}>
    <SEO title="404" description="There's nothing here!" />
    <Header small />
    <Section id="webcomics">
      <h2 className="section-heading text-center">Page not found</h2>
      <hr className="primary" />
      <p>
        The URL you have visited does not exist on this website. Use the navbar
        to take you where you want to go.
      </p>
    </Section>
  </Layout>
)

export default FourOhFour
