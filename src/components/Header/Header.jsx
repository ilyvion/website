import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"
import containerStyles from "./Header.module.css"
import portrait from "./portrait.jpg"

import moment from "moment"

import useInterval from "@utils/useInterval"

const Header = ({ small, header, tagline }) => {
  const [now, setNow] = useState(moment())
  useInterval(() => {
    setNow(moment())
  }, 1000)

  let specialStyle = useMemo(() => {
    let month = now.month() + 1

    if (month === 12) {
      return (
        containerStyles.headerWinter + " " + containerStyles.headerChristmas
      )
    } else if (month > 10 || month < 3) {
      return containerStyles.headerWinter
    }

    return null
  }, [now])

  let specialComponent = useMemo(() => {
    if (specialStyle !== null) {
      return <div className={specialStyle} aria-hidden="true"></div>
    } else {
      return null
    }
  }, [specialStyle])

  if (small) {
    return <header className={containerStyles.headerSmall}></header>
  } else {
    return (
      <header className={containerStyles.header}>
        <div className={containerStyles.headerContent}>
          <div className={containerStyles.headerContentInner}>
            <img className={containerStyles.imgCircle} src={portrait} alt="" />
            <h1 className={containerStyles.headerContentInnerH1}>{header}</h1>
            <hr className={containerStyles.headerContentInnerHr} />
            <span className={containerStyles.btnBlue}>{tagline}</span>
          </div>
        </div>
        {specialComponent}
      </header>
    )
  }
}

Header.propTypes = {
  small: PropTypes.bool,
  header: PropTypes.string,
  tagline: PropTypes.string,
}

export default Header
