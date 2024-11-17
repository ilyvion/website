import React from "react"
import round from "lodash/round"
import { map } from "lodash"

const UNIT_CONVERSIONS = {
  kg: ["lbs", 2.204623, 1],
  g: ["oz", 0.03527396, 1],
  kcal: ["kJ", 4.184, 0],
  km: ["miles", 0.6213712, 1],
  ml: ["fl oz", 0.03519508, 1],
  "g/kg": ["g/lbs", 1 / 2.204623, 1],
  // derived:
  "km/h": ["mph", "km"],
}

const INVERTED_UNIT_CONVERSIONS = {}
Object.keys(UNIT_CONVERSIONS).forEach(key => {
  const value = UNIT_CONVERSIONS[key]
  if (typeof value[1] === "string") {
    INVERTED_UNIT_CONVERSIONS[value[0]] = [key, UNIT_CONVERSIONS[value[1]][0]]
  } else {
    INVERTED_UNIT_CONVERSIONS[value[0]] = [key, 1 / value[1], value[2]]
  }
})

const Measurement = ({ children }) => {
  const [value, unit] = children.split(" ")
  let conversion = null
  let inversion = false
  if (unit in UNIT_CONVERSIONS) {
    conversion = UNIT_CONVERSIONS[unit]
  } else if (unit in INVERTED_UNIT_CONVERSIONS) {
    conversion = INVERTED_UNIT_CONVERSIONS[unit]
    inversion = true
  }
  if (typeof conversion[1] === "string") {
    let derivee = null
    if (inversion) {
      derivee = INVERTED_UNIT_CONVERSIONS[conversion[1]]
    } else {
      derivee = UNIT_CONVERSIONS[conversion[1]]
    }
    conversion = [conversion[0], derivee[1], derivee[2]]
  }
  if (conversion !== null) {
    let converted = Number(value) * conversion[1]
    if (inversion) {
      return (
        <>
          {round(converted, conversion[2])}&nbsp;
          {conversion[0]} ({value}&nbsp;{unit})
        </>
      )
    } else {
      return (
        <>
          {value}&nbsp;{unit} ({round(converted, conversion[2])}&nbsp;
          {conversion[0]})
        </>
      )
    }
  }
  console.warn("Measurement given with unrecognized unit:", unit)
  return (
    <>
      {value}&nbsp;{unit}{" "}
      <span style={{ color: "red" }}>(unrecognized conversion)</span>
    </>
  )
}

export default Measurement
