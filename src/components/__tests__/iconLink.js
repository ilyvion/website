import React from "react"
import renderer from "react-test-renderer"

import IconLink from "../IconLink"

describe("IconLink", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<IconLink color="color" href="href" icon="icon" text="text" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with custom columnSize", () => {
    const tree = renderer
      .create(
        <IconLink
          color="color"
          href="href"
          icon="icon"
          text="text"
          columnSize={6}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
