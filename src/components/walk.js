import { floor, round } from "lodash"
import React, { useMemo } from "react"

import Measurement from "@components/measurementConversion"

const Walk = ({ hours, minutes, distance }) => {
  if (!hours) {
    hours = 0
  }

  const totalMinutes = hours * 60 + minutes
  hours = floor(totalMinutes / 60, 0)
  minutes = totalMinutes % 60

  const speed = round(distance / (totalMinutes / 60), 1) + " km/h"
  distance = round(distance, 1) + " km"

  let time = useMemo(() => {
    if (hours === 0) {
      return <>{pluralize("minute", minutes)}</>
    } else {
      return (
        <>
          {pluralize("hour", hours)} and {pluralize("minute", minutes)}
        </>
      )
    }
  }, [hours, minutes])
  return (
    <>
      {time} at a distance of <Measurement children={distance} /> (speed{" "}
      <Measurement children={speed} />)
    </>
  )
}

function pluralize(singular, value) {
  if (value === 1) {
    return `${value} ${singular}`
  } else {
    return `${value} ${singular}s`
  }
}

export default Walk
