import React from "react"
import renderer from "react-test-renderer"

import Header from "../Header"

const header = "Header"
const tagLine = "Tag Line"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Header header={header} tagline={tagLine} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("small renders correctly", () => {
    const tree = renderer.create(<Header small />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
