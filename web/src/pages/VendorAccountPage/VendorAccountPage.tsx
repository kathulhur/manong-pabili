import { Link, navigate, routes } from "@redwoodjs/router";
import { useAuth } from "src/auth";
import VendorAccountCell from "src/components/VendorAccountCell";

const VendorAccountPage = () => {
  const { currentUser, loading: authLoading, isAuthenticated } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate(routes.login())
    return null
  }

  return (
  <div className="max-w-7xl mx-auto p-8">
    <div className="p-8 space-y-8">
      <Link
          className="border py-2 px-4 rounded-md "
          to={routes.home()}
        >
          &lt;  Vendor Dashboard
      </Link>
      <VendorAccountCell userId={currentUser?.id} />
    </div>
  </div>
  );


};

export default VendorAccountPage;
