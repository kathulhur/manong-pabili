import { navigate, routes } from "@redwoodjs/router";
import { useCallback } from "react";
import { useAuth } from "src/auth";


export default function useLogout() {
  const { logOut: redwoodLogout } = useAuth();

  const logOut = useCallback(async () => {
    try {
      const success = await redwoodLogout();
      if(success) {
        navigate(routes.index())
      } else {
        alert('Something went wrong')
      }
    } catch (err) {

    }
  }, [redwoodLogout])

  return logOut
}