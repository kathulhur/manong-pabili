import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { useEffect } from "react";
import { useAuth } from "src/auth";

const ForbiddenPage = () => {
  const { isAuthenticated, loading, currentUser } = useAuth();


  console.log(loading, isAuthenticated, currentUser)
  return (
    <>
      <MetaTags title="Forbidden" description="Forbidden page" />

      <h1>You don't have permission to visit this page</h1>
      <p>
        {
          !loading && isAuthenticated && <>
            {
               currentUser && (<>
                  {currentUser.roles.includes('ADMIN') && <Link to={routes.index()}>Go back to admin dashboard</Link>}
                  {currentUser.roles.includes('VENDOR') && <Link to={routes.index()}>Go back to vendor homepage</Link>}
              </>)
            }
          </>
        }
        { !loading && !isAuthenticated && <Link to={routes.index()}>Go back to index homepage</Link>}
      </p>

    </>
  );
};

export default ForbiddenPage;
