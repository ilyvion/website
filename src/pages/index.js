import React from "react"
import { graphql, Link } from "gatsby"
import moment from "moment"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Header from "@components/Header"
import Section, { CenteredSection } from "@components/Section"
import ListGroup from "@components/ListGroup"
import IconLink from "@components/IconLink"
import ExternalLink from "@components/externalLink"

import containerStyles from "./index.module.css"

export default function Home({ data, path }) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const programmingFor =
    currentYear - data.site.siteMetadata.years.startingProgrammingYear
  const professionallyFor =
    currentYear -
    data.site.siteMetadata.years.startingProgrammingProfessionallyYear

  let recentBlogPosts = data.allMdx.edges

  recentBlogPosts = recentBlogPosts.map(e => (
    <div className="col-sm-4" key={e.node.fields.slug}>
      <Link
        style={{ display: "block" }}
        className={containerStyles.blogPreview}
        to={`blog${e.node.fields.slug}`}
      >
        <h3>{e.node.frontmatter.title}</h3>
        <p>
          <span
            title={moment(e.node.frontmatter.raw_date).format(
              "MMMM DD, YYYY HH:mm"
            )}
          >
            {e.node.frontmatter.date}
          </span>{" "}
          &nbsp; &middot; &nbsp;{` `}
          {e.node.fields.readingTime.text}
        </p>
        <p>{e.node.excerpt}</p>
      </Link>
    </div>
  ))

  return (
    <Layout path={path}>
      <SEO title={data.site.siteMetadata.description} />
      <Header header="Hello, I'm Alex!" tagline="Software Developer" />
      <Section id="blog">
        <h2 className="section-heading text-center">
          <Link to="/blog/">Recent blog posts</Link>
        </h2>
        <hr className="primary" />
        <p className="text-center">
          <Link to="/blog/tags/">Browse by tag</Link>&nbsp; &middot; &nbsp;Feed:{" "}
          <Link to="/blog/rss.xml" title="RSS">
            <i className="fa fa-rss" aria-hidden="true"></i>
          </Link>
        </p>
        <div className="row">{recentBlogPosts}</div>
      </Section>
      <CenteredSection className="bg-primary" id="about">
        <h2 className="section-heading">About Me</h2>
        <hr className="light" />
        <p>
          Software development has been my passion since I was around 9 years
          old, and I have since learned a large body of languages and
          technologies. My main goal is to become as good a software developer
          as I can, in order to produce high-quality reliable software as
          quickly as possible. As of {currentYear}, I have been programming for{" "}
          {programmingFor}&nbsp;years; {professionallyFor}&nbsp;years
          professionally.
        </p>
        <p>
          I'm highly passionate about software development, and I do my best to
          use good coding practices and the best and most modern technologies
          available. I consider myself competent in desktop software
          development, as well as back-end and front-end (i.e. full-stack) web
          development.
        </p>
        <p>
          Academically, I have a bachelor of computer science from{" "}
          <ExternalLink className="white underline" to="http://www.uio.no/">
            the University of Oslo
          </ExternalLink>
          .
        </p>
        <blockquote>
          <p>
            Science is what we understand well enough to explain to a computer.
            Art is everything else we do.
          </p>
          <footer className="text-faded">Donald Knuth</footer>
        </blockquote>
      </CenteredSection>
      <Section id="skills">
        <h2 className="section-heading text-center">Skills</h2>
        <hr className="primary" />
        <br />
        <div className="row">
          <ListGroup
            columnSize={6}
            values={[
              "C#",
              ".NET Framework/Core",
              "ASP.NET Framework/Core",
              "ASP.NET MVC",
              "Episerver CMS",
              "LINQ",
              "Entity Framework",
              "WCF",
              "WPF",
              "VB.NET",
              "Silverlight",
            ]}
          />
          <ListGroup
            columnSize={6}
            values={[
              "Javascript",
              "HTML5",
              "CSS3",
              "GraphQL",
              "ReactJS",
              "GatsbyJS",
              "AngularJS / Angular",
              "jQuery",
              "Bootstrap",
              "Semantic UI",
              "Gulp",
              "Grunt",
              "Webpack",
            ]}
          />
        </div>
        <div className="row">
          <ListGroup
            values={[
              "Java",
              "Node.js",
              "Rust",
              "C",
              "PHP",
              "Python",
              "MSIL",
              "Vala",
            ]}
          />
          <ListGroup
            values={[
              "Git",
              "Mercurial",
              "Subversion",
              "Team Foundation Server",
              "Visual Studio",
              "Powershell",
            ]}
          />
          <ListGroup
            values={[
              "SQL",
              "MySQL",
              "PostgreSQL",
              "Visual Studio",
              "Maven",
              "Travis CI",
              "Jenkins",
              "LaTeX",
            ]}
          />
        </div>
      </Section>
      <CenteredSection id="code" className="bg-primary">
        <h2 className="section-heading">Code</h2>
        <hr className="light" />
        <br />
        <IconLink
          color="white"
          href={`https://github.com/${data.site.siteMetadata.code.github}`}
          icon="github"
          text="Github"
        />
        <IconLink
          color="white"
          href={`https://stackoverflow.com/users/${data.site.siteMetadata.code.stackoverflow.id}/${data.site.siteMetadata.code.stackoverflow.name}`}
          icon="stack-overflow"
          text="Stack Overflow"
        />
        <IconLink
          color="white"
          href={`https://bitbucket.org/${data.site.siteMetadata.code.bitbucket}`}
          icon="bitbucket"
          text="Bitbucket"
        />
      </CenteredSection>
      <CenteredSection id="social" className="bg-secondary">
        <h2 className="section-heading">Social</h2>
        <hr className="light" />
        <br />
        <IconLink
          color="white"
          href={`https://www.linkedin.com/in/${data.site.siteMetadata.social.linkedin}/`}
          icon="linkedin"
          text="LinkedIn"
        />
        <IconLink
          color="white"
          href={`https://www.facebook.com/${data.site.siteMetadata.social.facebook}`}
          icon="facebook"
          text="Facebook"
        />
        <IconLink
          color="white"
          href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
          icon="twitter"
          text="Twitter"
        />
      </CenteredSection>
      <CenteredSection id="contact">
        <h2 className="section-heading">Contact</h2>
        <hr className="primary" />
        <IconLink
          color="black"
          href={`mailto:${data.site.siteMetadata.social.email}`}
          icon="envelope"
          text={data.site.siteMetadata.social.email}
        />
        <IconLink
          color="black"
          href="/alexschrod.asc"
          icon="key-modern"
          text="PGP Key"
        />
        <IconLink
          color="black"
          href="https://keybase.io/alexschrod"
          icon="keybase"
          text="Keybase"
        />
      </CenteredSection>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        code {
          github
          stackoverflow {
            id
            name
          }
          bitbucket
        }
        social {
          email
          twitter
          facebook
          linkedin
        }
        years {
          startingProgrammingYear
          startingProgrammingProfessionallyYear
        }
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 3) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            raw_date: date
          }
          excerpt
        }
      }
    }
  }
`
