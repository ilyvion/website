import React from "react"
import round from "lodash/round"

const Measurement = ({ children }) => {
  let [value, unit] = children.split(" ")
  if (unit === "kg") {
    let lbs = Number(value) * 2.204623
    return (
      <>
        {value}&nbsp;{unit} ({round(lbs, 1)}&nbsp;lbs)
      </>
    )
  } else if (unit === "g") {
    let oz = Number(value) * 0.03527396
    return (
      <>
        {value}&nbsp;{unit} ({round(oz, 1)}&nbsp;oz)
      </>
    )
  } else if (unit === "kcal") {
    let kj = Number(value) * 4.184
    return (
      <>
        {value}&nbsp;{unit} ({round(kj, 0)}&nbsp;kJ)
      </>
    )
  } else if (unit === "kJ") {
    let kcal = Number(value) * 0.239006
    return (
      <>
        {round(kcal, 0)}&nbsp;kcal ({value}&nbsp;{unit})
      </>
    )
  } else if (unit === "km" || unit === "km/h") {
    let miles = Number(value) * 0.6213712
    let milesUnit = unit === "km" ? "miles" : "mph"
    return (
      <>
        {value}&nbsp;<span style={{ whiteSpace: "nowrap" }}>{unit}</span> (
        {round(miles, 1)}&nbsp;{milesUnit})
      </>
    )
  } else if (unit === "ml") {
    let floz = Number(value) * 0.03519508
    return (
      <>
        {value}&nbsp;{unit} ({round(floz, 1)}&nbsp;fl&nbsp;oz)
      </>
    )
  }
  console.warn("Measurement given with unrecognized unit:", unit)
  return (
    <>
      {value}&nbsp;{unit}
    </>
  )
}

export default Measurement
