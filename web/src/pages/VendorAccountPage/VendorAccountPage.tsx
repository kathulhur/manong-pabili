import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Link, navigate, routes } from "@redwoodjs/router";
import { useAuth } from "src/auth";
import Button from "src/components/Button/Button";
import VendorAccountCell from "src/components/VendorAccountCell";

const VendorAccountPage = () => {
  const { currentUser } = useAuth();


  return (
  <div className="max-w-2xl mx-auto p-8 space-y-8">
    <Link
        to={routes.home()}
      >
        <Button
          icon={<ChevronLeftIcon />}
          variant="subtle"
        >
          Vendor Dashboard
        </Button>
    </Link>
    <VendorAccountCell userId={currentUser?.id} />
  </div>
  );


};

export default VendorAccountPage;
