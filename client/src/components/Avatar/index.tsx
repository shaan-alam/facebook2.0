import useUser from "../../hooks/useUser";
import User from "../../assets/svg/user.svg";

const Avatar = ({
  className,
  name,
  withName,
}: {
  className: string;
  name?: string;
  withName?: boolean;
}) => {
  const user = useUser();

  return withName ? (
    <div className="flex items-center">
      <img
        src={user?.avatar ? user?.avatar : User}
        alt={user?.fullName}
        className={className}
      />
      <p className="ml-2 text-fb font-semibold">{name}</p>
    </div>
  ) : (
    <img
      src={user?.avatar ? user?.avatar : User}
      alt={user?.fullName}
      className={className}
    />
  );
};

export default Avatar;
