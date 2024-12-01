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
    <Section id="fitness" className="no-bottom-margin">
      <h2 className="section-heading text-center">Fitness and Health</h2>
      <hr className="primary" />
      <h3>YouTube</h3>
      <p>
        These are sorted by a combination of how much useful information I can
        glean from these channels and how much I enjoy them, but you should make
        up your own mind about whether <strong>you</strong> should trust them or
        not.
      </p>
      <ul>
        <li>
          <ExternalLink to="https://www.youtube.com/@FitnessOutrageous">
            Ali Spagnola's Fitness Outrageous
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@NoLabCoatRequired">
            No Lab Coat Required
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@RenaissancePeriodization">
            Renaissance Periodization
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@JeffNippard">
            Jeff Nippard
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@WillTennyson">
            Will Tennyson
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@menno.henselmans">
            Menno Henselmans
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@coacheugeneteo">
            Eugene Teo
          </ExternalLink>
        </li>
        <li>
          <ExternalLink to="https://www.youtube.com/@JeremyEthier">
            Jeremy Ethier
          </ExternalLink>
        </li>
      </ul>
      <h3>General/Miscellaneous/Other</h3>
      <ul>
        <li>
          <ExternalLink to="https://thefitness.wiki/">
            The Fitness Wiki
          </ExternalLink>
        </li>
      </ul>
    </Section>
    <Section id="webcomics">
      <h2 className="section-heading text-center">Webcomics</h2>
      <hr className="primary" />
      <p>
        <i className="fa fa-star" aria-label="star"></i> = highly recommended
        <br />
        <i class="fa fa-moon" aria-label="moon"></i> = no longer updated
      </p>
      <h3>
        <abbr title="Safe For Work">SFW</abbr>
      </h3>
      <ul>
        <li>
          <ExternalLink to="https://questionablecontent.net/">
            Questionable Content
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>
        </li>
        <li>
          <ExternalLink to="https://grrlpowercomic.com/">
            Grrl Power
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>
        </li>
        <li>
          <ExternalLink to="https://dumbingofage.com/">
            Dumbing of Age
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>
        </li>
        <li>
          <ExternalLink to="https://awakencomic.com/">Awaken</ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>
        </li>
        <li>
          <ExternalLink to="https://cygulls.itch.io/the-art-of-oddity-woods">
            Oddity Woods
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>{" "}
          <i class="fa fa-moon" aria-label="moon"></i>
        </li>
        <li>
          <ExternalLink to="https://www.parallaxcomic.com/">
            Parallax
          </ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>{" "}
          <i class="fa fa-moon" aria-label="moon"></i>
        </li>
        <li>
          <ExternalLink to="https://flakypastry.runningwithpencils.com/">
            Flaky Pastry
          </ExternalLink>
          <i class="fa fa-moon" aria-label="moon"></i>
        </li>
        <li>
          <ExternalLink to="https://ohumanstar.com/">O Human Star</ExternalLink>{" "}
          <i class="fa fa-moon" aria-label="moon"></i>
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
        <li>
          <ExternalLink to="https://lawcomic.net/">
            The Illustrated Guide to Law
          </ExternalLink>
        </li>
      </ul>
      <h3>
        <abbr title="Not Safe For Work">NSFW</abbr>
      </h3>
      <ul>
        <li>
          <ExternalLink to="https://buttsmithy.com/">Alfie</ExternalLink>{" "}
          <i className="fa fa-star" aria-label="star"></i>
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
