import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const useUser = () => {
  const user = useSelector((state: RootState) => state.auth.authData.user);

  return user;
};

export default useUser;
