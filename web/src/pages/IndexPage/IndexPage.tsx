import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const IndexPage = () => {
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
