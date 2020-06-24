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
      error: false,
    }
  }

  componentDidMount() {
    const { gitHubAccount, issueId } = this.props
    const data = localStorage.getItem(`comments_${gitHubAccount}_${issueId}`)
    if (data) {
      this.setState({ data: JSON.parse(data) })
    } else {
      this.reloadComments()
    }
  }

  reloadComments() {
    const { gitHubAccount, issueId } = this.props
    const apiUrl = `https://api.github.com/repos/${gitHubAccount}/issues/${issueId}/comments?per_page=100`

    this.setState({ loading: true })
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.full+json",
      },
    })
      .then(res => Promise.all([res.json(), Promise.resolve(res.status)]))
      .then(
        result => {
          let status = result[1]
          let response = result[0]

          if (status === 200) {
            const lastUpdated = new Date()
            const data = { lastUpdated, comments: response }
            localStorage.setItem(
              `comments_${gitHubAccount}_${issueId}`,
              JSON.stringify(data)
            )
            this.setState({ data, error: false })
          } else {
            this.setState({ error: true })
            console.error("GitHub API error:", status, response)
          }
          this.setState({ loading: false })
        },
        error => {
          this.setState({ error: true, loading: false })
          console.error("Fetch error:", error)
        }
      )
  }

  render() {
    const { gitHubAccount, issueId } = this.props
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
      additional = (
        <>
          The comments cannot be shown inline because we have hit the rate limit
          of GitHub.
        </>
      )
      comments = <></>
    }

    return (
      <>
        <h3>Comments</h3>
        <p>
          You can{" "}
          <ExternalLink
            to={`https://github.com/${gitHubAccount}/issues/${issueId}`}
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
            gitHubAccount
          }
        }
      }
    `
  )
  return (
    <BlogComments
      gitHubAccount={data.site.siteMetadata.gitHubAccount}
      {...props}
    />
  )
}
