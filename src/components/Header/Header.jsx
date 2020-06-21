import React from "react"
import containerStyles from "./Header.module.css"
import portrait from "./portrait.jpg"

const Header = ({ small, header, tagline }) => {
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
      </header>
    )
  }
}

export default Header
