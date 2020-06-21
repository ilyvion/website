import React from "react"
import renderer from "react-test-renderer"

import ExternalLink from "../externalLink"

describe("ExternalLink", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ExternalLink to="http://example.com/" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
