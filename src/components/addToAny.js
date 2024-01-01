import React, { useEffect, useRef } from "react"

const AddToAny = ({ children }) => {
  useEffect(() => {
    setTimeout(() => {
      if (window.a2a) window.a2a.init_all()
    }, 10)
  }, [])

  return <>{children}</>
}

export default AddToAny
