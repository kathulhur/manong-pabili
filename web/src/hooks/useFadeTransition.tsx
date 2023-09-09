import { useEffect, useState } from "react";


export default function useShowing() {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)
  }, [])

  return isShowing
}