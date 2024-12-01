import { useEffect, useLayoutEffect, useRef } from "react"

var useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect
export default function useInterval(callback, delay) {
  const savedCallback = useRef(callback)
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    if (delay === null) {
      return
    }
    const id = setInterval(() => {
      savedCallback.current()
    }, delay)
    return () => {
      clearInterval(id)
    }
  }, [delay])
}
