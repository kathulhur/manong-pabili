import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";

const ForbiddenPage = () => {
  const { isAuthenticated, loading, currentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.roles.includes('ADMIN')) {
        navigate(routes.admin())
      } else if(currentUser.roles.includes('VENDOR')) {
        navigate(routes.home())
        return null
      } else {
        navigate(routes.index())
      }
    }

  }, [isAuthenticated, currentUser])


  if (loading) {
    return null
  }


  return (
    <>
      <MetaTags title="Forbidden" description="Forbidden page" />

      <h1>You don't have permission to visit this page</h1>
      <p>
        <Link to={routes.index()}>Go home</Link>
      </p>

    </>
  );
};

export default ForbiddenPage;
