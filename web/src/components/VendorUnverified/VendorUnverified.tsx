import { useAuth } from "src/auth";
import useLogout from "src/hooks/useLogout";
import Button from "../Button/Button";

const VendorUnverified = () => {
  const logOut = useLogout()
  return (
    <div className="mt-16 text-center">
      <h2>Your account is still under verification.</h2>
      <p>You will receive a text message once your account has been verfied</p>
      <p>Thank you for your patience.</p>
      <div className="flex justify-center mt-8">
        <Button onClick={logOut}>Logout</Button>
      </div>
    </div>
  );
};

export default VendorUnverified;
