import React, { Component } from "react"
import "./Progress.css"

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      totalProgress: 1000,
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", e => this.handleScroll(e), {
		passive: true,
	  })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", e => this.handleScroll(e))
  }

  handleScroll(event) {
    const body = document.body,
      html = document.documentElement

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )

    const progress = document.scrollingElement.scrollTop
    const totalProgress = height - document.scrollingElement.clientHeight

    this.setState({
      progress,
      totalProgress,
    })
  }

  render() {
    const { progress, totalProgress } = this.state
    return (
      <progress className="progress" value={progress} max={totalProgress}>
        <div className="progress-container">
          <span className="progress-bar"></span>
        </div>
      </progress>
    )
  }
}

export default Progress
