import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"

import ExternalLink from "@components/externalLink"

import containerStyles from "./blogComments.module.css"

const BlogComment = ({
  userAssociation,
  userLink,
  userName,
  userAvatarUrl,
  commentLink,
  commentDate,
  comment,
}) => (
  <div className={`media`}>
    <div className="media-left">
      <a href={userLink}>
        <img
          className={`media-object ${containerStyles.commentImage}`}
          src={userAvatarUrl}
          alt={userName}
        />
      </a>
      {userAssociation === "OWNER" && (
        <div className={containerStyles.OWNER}>Author</div>
      )}
    </div>
    <div className="media-body">
      <h4 className="media-heading">
        <a href={userLink}>{userName}</a> commented{" "}
        <a href={commentLink}>
          on {moment(commentDate).format("MMMM DD, YYYY HH:mm")}
        </a>
      </h4>
      <div dangerouslySetInnerHTML={{ __html: comment }}></div>
    </div>
  </div>
)

class LastRefreshed extends React.Component {
  constructor(props) {
    super(props)

    this.interval = null
    this.state = {
      now: null,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ now: new Date() })
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lastUpdated !== this.props.lastUpdated) {
      this.setState({ now: new Date() })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { lastUpdated } = this.props
    const { now } = this.state
    return <>Last refreshed: {moment(lastUpdated).from(now)}</>
  }
}

class BlogComments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    const { gitHubRepository, issueId } = this.props
    const data = localStorage.getItem(`comments_${gitHubRepository}_${issueId}`)
    if (data) {
      this.setState({ data: JSON.parse(data) })
    } else {
      this.reloadComments()
    }
  }

  reloadComments() {
    const { gitHubRepository, issueId } = this.props
    const { data } = this.state

    const apiUrl = `https://api.github.com/repos/${gitHubRepository}/issues/${issueId}/comments?per_page=100`

    const headers = {
      Accept: "application/vnd.github.full+json",
    }
    if (data && data.etag) {
      headers["If-None-Match"] = data.etag
    }

    this.setState({ loading: true })
    fetch(apiUrl, {
      method: "GET",
      headers,
    }).then(
      async res => {
        if (res.status === 200) {
          const lastUpdated = new Date()
          const etag = res.headers.get("Etag")
          const comments = await res.json()
          const data = { lastUpdated, comments, etag }
          localStorage.setItem(
            `comments_${gitHubRepository}_${issueId}`,
            JSON.stringify(data)
          )
          this.setState({ data, error: null })
        } else if (res.status === 304) {
          data.lastUpdated = new Date()
          localStorage.setItem(
            `comments_${gitHubRepository}_${issueId}`,
            JSON.stringify(data)
          )
          this.setState({ data, error: null })
        } else {
          const contentType = headers.get("Content-Type")
          let errorData, errorType
          if (contentType.includes("json")) {
            errorType = "json"
            errorData = await res.json()
          } else {
            errorType = "text"
            errorData = await res.text()
          }
          const error = { type: errorType, data: errorData }
          this.setState({ error })
        }
        this.setState({ loading: false })
      },
      error => {
        this.setState({ error: { type: "fetch", data: error }, loading: false })
      }
    )
  }

  render() {
    const { gitHubRepository, issueId } = this.props
    const { error, data } = this.state

    let additional
    let comments
    if (!error) {
      additional = (
        <>
          or{" "}
          <button
            className="btn btn-primary"
            onClick={() => this.reloadComments()}
          >
            refresh
          </button>{" "}
          the comments below.{" "}
          <LastRefreshed lastUpdated={data && data.lastUpdated} />
        </>
      )
      if (data) {
        if (data.comments.length) {
          comments = data.comments.map(c => (
            <BlogComment
              key={c.node_id}
              userAssociation={c.author_association}
              userLink={c.user.html_url}
              userName={c.user.login}
              userAvatarUrl={c.user.avatar_url}
              commentLink={c.html_url}
              commentDate={c.created_at}
              comment={c.body_html}
            />
          ))
        } else {
          comments = <p>No comments yet.</p>
        }
      } else {
        comments = <></>
      }
    } else {
      switch (error.type) {
        case "json":
          additional = (
            <>
              The comments cannot be shown inline because we have received an
              error from GitHub's API:
            </>
          )
          comments = (
            <p>
              {error.data.message}{" "}
              <ExternalLink to={error.data.documentation_url}>
                Documentation
              </ExternalLink>
            </p>
          )
          break
        case "text":
          additional = (
            <>
              The comments cannot be shown inline because we have received an
              error from GitHub's API:
            </>
          )
          comments = (
            <div dangerouslySetInnerHTML={{ __html: error.data }}></div>
          )
          break
        case "fetch":
          additional = (
            <>
              The comments cannot be shown inline because we encountered an
              error while attempting to contact GitHub:
            </>
          )
          comments = <p>{error.data}</p>
          break
      }
    }

    return (
      <>
        <h3>Comments</h3>
        <p>
          You can{" "}
          <ExternalLink
            to={`https://github.com/${gitHubRepository}/issues/${issueId}`}
          >
            view and leave comments
          </ExternalLink>{" "}
          on GitHub, {additional}
        </p>
        {comments}
      </>
    )
  }
}

export default props => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            gitHubRepository
          }
        }
      }
    `
  )
  return (
    <BlogComments
      gitHubRepository={data.site.siteMetadata.gitHubRepository}
      {...props}
    />
  )
}
