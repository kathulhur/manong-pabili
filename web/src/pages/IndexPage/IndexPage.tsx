import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";

const IndexPage = () => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  useEffect(() => {
      if (isAuthenticated && currentUser) {
          if(currentUser.roles.includes('VENDOR')) {
              navigate(routes.home())
          }
      }
  }, [isAuthenticated])

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <MetaTags title="Index" description="Index page" />

      <div>
        <h1>IndexPage</h1>
        <Link to={routes.login()}>Login as Vendor &gt;</Link>
      </div>

    </>
  );
};

export default IndexPage;
