import React, { useEffect, useRef, useState } from "react"

const isBrowser = typeof window !== "undefined"

// This component expects to have as its children two markdown images. Example:
// ```markdown
// ![credit 1](image1.png "label 1")
//
// ![credit 2](image2.png "label 2")
// ```
const Juxtapose = ({ id, children }) => {
  const ref = useRef()
  const [juxtaposeAvailable, setJuxtaposeAvailable] = useState(
    isBrowser ? window.juxtapose !== undefined : false
  )
  const [juxtaposeCreated, setJuxtaposeCreated] = useState(false)

  useEffect(() => {
    let juxtaposeTimeout = null

    function waitForJuxtapose() {
      if (window.juxtapose !== undefined) {
        setJuxtaposeAvailable(true)
        juxtaposeTimeout = null
      } else {
        juxtaposeTimeout = setTimeout(waitForJuxtapose, 100)
      }
    }

    if (ref.current) {
      if (!juxtaposeAvailable) {
        waitForJuxtapose()
      } else if (!juxtaposeCreated) {
        const imageData1 =
          children[0].props.children.props.children[1].props.children[3].props
        const imageSrc1 =
          children[0].props.children.props.children[1].props.href
        const imageData2 =
          children[1].props.children.props.children[1].props.children[3].props
        const imageSrc2 =
          children[1].props.children.props.children[1].props.href

        new window.juxtapose.JXSlider(
          "#" + id,
          [
            {
              src: imageSrc1,
              label: imageData1.title,
              credit: imageData1.alt.trim() ? imageData1.alt : undefined,
            },
            {
              src: imageSrc2,
              label: imageData2.title,
              credit: imageData2.alt.trim() ? imageData2.alt : undefined,
            },
          ],
          {
            animate: true,
            showLabels: true,
            showCredits: false,
            startingPosition: "75%",
            makeResponsive: true,
          }
        )
        setJuxtaposeCreated(true)
      }
    }

    return () => {
      if (juxtaposeTimeout !== null) {
        clearTimeout(juxtaposeTimeout)
        juxtaposeTimeout = null
      }
    }
  }, [
    ref,
    id,
    children,
    juxtaposeAvailable,
    setJuxtaposeAvailable,
    juxtaposeCreated,
    setJuxtaposeCreated,
  ])

  return <div id={id} ref={ref} />
}

export default Juxtapose
