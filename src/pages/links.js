import React from "react"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section from "@components/Section"
import ExternalLink from "@components/externalLink"

const Links = ({ path }) => (
  <Layout path={path}>
    <SEO
      title="Links"
      description="External sites that I recommend that you visit"
    />
    <Header small />
    <Section id="webcomics">
      <h2 className="section-heading text-center">Webcomics</h2>
      <hr className="primary" />
      <p>
        <i className="fa fa-star" aria-hidden="true"></i> = highly recommended
      </p>
      <h3>
        <abbr title="Safe For Work">SFW</abbr>
      </h3>
      <ul>
        <li>
          <ExternalLink to="https://questionablecontent.net/">
            Questionable Content
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <ExternalLink to="https://grrlpowercomic.com/">
            Grrl Power
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <ExternalLink to="https://dumbingofage.com/">
            Dumbing of Age
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <ExternalLink to="https://flakypastry.runningwithpencils.com/">
            Flaky Pastry
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://lawcomic.net/">
            The Illustrated Guide to Law
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://ohumanstar.com/">O Human Star</ExternalLink>
        </li>
        <li>
          <ExternalLink to="http://girlgeniusonline.com/">
            Girl Genius
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://smbc-comics.com/">
            SMBC: Saturday Morning Breakfast Cereal
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://theoatmeal.com/">The Oatmeal</ExternalLink>
        </li>
      </ul>
      <h3>
        <abbr title="Not Safe For Work">NSFW</abbr>
      </h3>
      <ul>
        <li>
          <ExternalLink to="https://buttsmithy.com/">Alfie</ExternalLink>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <ExternalLink to="https://oglaf.com/">Oglaf</ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://ohjoysextoy.com/">
            Oh Joy Sex Toy
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="http://www.therockcocks.com/">
            The Rock Cocks
          </ExternalLink>
        </li>
      </ul>
    </Section>
  </Layout>
)

export default Links
