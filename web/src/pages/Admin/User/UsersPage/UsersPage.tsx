import UsersCell from "src/components/Admin/User/UsersCell";

const UsersPage = ({ page = 1}) => {
  return (
    <div>
      <UsersCell page={page} />
    </div>
  );
};

export default UsersPage;
