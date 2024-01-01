import React, { useEffect, useRef } from "react"

// Thanks to <https://www.paulie.dev/posts/2022/08/how-to-use-utterances-with-react/> for this
// very helpful React component allowing utterances to be easily used with React.
const UtterancesComments = ({ issueNumber }) => {
  const ref = useRef()

  useEffect(() => {
    const script = document.createElement("script")

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "alexschrod/website",
      "issue-number": "" + issueNumber,
      theme: "github-light",
      crossOrigin: "anonymous",
      defer: true,
    }

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    setTimeout(() => {
      ref.current.append(script)
    }, 300)
  }, [issueNumber])

  return <div ref={ref} />
}

export default UtterancesComments
