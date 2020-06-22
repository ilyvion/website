import React from "react"
import renderer from "react-test-renderer"
import { shallow, mount, render } from "enzyme"

import ListGroup from "../ListGroup"

const values = ["One", "Two", "Three"]

describe("ListGroup", () => {
  it("should return null when no values are given", () => {
    const tree = renderer.create(<ListGroup values={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly", () => {
    const tree = renderer.create(<ListGroup values={values} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with custom columnSize", () => {
    const tree = renderer
      .create(<ListGroup values={values} columnSize={6} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders correctly with custom icon", () => {
    const tree = renderer
      .create(<ListGroup values={values} icon="icon" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
