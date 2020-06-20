import React from "react"

import Layout from "../components/layout"
import Header from "../components/Header"
import Section from "../components/Section"

const Links = ({ path }) => (
  <Layout pageTitle="Links" path={path}>
    <Header className="small" />
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
          <a href="https://questionablecontent.net/">
            Questionable Content{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <a href="https://grrlpowercomic.com/">
            Grrl Power{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <a href="https://dumbingofage.com/">
            Dumbing of Age{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <a href="https://flakypastry.runningwithpencils.com/">
            Flaky Pastry{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://lawcomic.net/">
            The Illustrated Guide to Law{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://ohumanstar.com/">
            O Human Star{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="http://girlgeniusonline.com/">
            Girl Genius{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://smbc-comics.com/">
            SMBC: Saturday Morning Breakfast Cereal{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://theoatmeal.com/">
            The Oatmeal{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <h3>
        <abbr title="Not Safe For Work">NSFW</abbr>
      </h3>
      <ul>
        <li>
          <a href="https://buttsmithy.com/">
            Alfie <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>{" "}
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
        <li>
          <a href="https://oglaf.com/">
            Oglaf <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="https://ohjoysextoy.com/">
            Oh Joy Sex Toy{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
        <li>
          <a href="http://www.therockcocks.com/">
            The Rock Cocks{" "}
            <i className="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </Section>
  </Layout>
)

export default Links
