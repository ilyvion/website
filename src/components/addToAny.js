import React, { useEffect, useState } from "react"

const AddToAny = ({ children }) => {
  let [broken, setBroken] = useState(false)
  useEffect(() => {
    let initAttempts = 0
    function attemptA2AInit() {
      if (window.a2a) {
        window.a2a.init_all()
      } else {
        initAttempts++
        if (initAttempts < 10) {
          requestIdleCallback(attemptA2AInit, { timeout: 100 })
        } else {
          setBroken(true)
        }
      }
    }
    requestIdleCallback(attemptA2AInit, { timeout: 100 })
  }, [])

  if (!broken) {
    return <>{children}</>
  } else {
    return (
      <>
        <small>
          <strong>ERROR</strong>: Failed to load article sharing script. Check
          to make sure any privacy-blocking browser extension you are runnning,
          if any, isn't blocking AddToAny's script if you'd like to use this
          feature.
        </small>
      </>
    )
  }
}

export default AddToAny
