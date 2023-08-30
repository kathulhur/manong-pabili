import { useAuth } from "src/auth";
import useLogout from "src/hooks/useLogout";

const VendorUnverified = () => {
  const logOut = useLogout()
  return (
    <div>
      <h2>Your account is still under verification.</h2>
      <p>You will receive a text message once your account has been verfied</p>
      <p>Thank you for your patience.</p>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default VendorUnverified;
