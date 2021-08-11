import useUser from "../../hooks/useUser";
import User from "../../assets/svg/user.svg";

const Avatar = ({ className }: { className: string }) => {
  const user = useUser();

  return (
    <img
      src={user?.avatar ? user?.avatar : User}
      alt={user?.fullName}
      className={className}
    />
  );
};

export default Avatar;
