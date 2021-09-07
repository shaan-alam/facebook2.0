import { useMutation, useQueryClient } from "react-query";
import { updateProfileDetails } from "../api";
import useUser from "./useUser";
import { useDispatch } from "react-redux";
import { SET_USER } from "../constants";

interface ProfileDetails {
  lives_in_city: string;
  from_city: string;
  works: string[];
  bio: string;
  education: string[];
}

const useEditUserDetails = () => {
  const queryClient = useQueryClient();
  const user = useUser();
  const dispatch = useDispatch();

  const mutation = useMutation(
    (details: ProfileDetails) => updateProfileDetails(details),
    {
      onSuccess: (values) => {
        queryClient.refetchQueries(["profile", user._id]);

        const profile = JSON.parse(localStorage.getItem("profile") || "{}");
        profile.user = values.data;

        localStorage.setItem("profile", JSON.stringify(profile));

        dispatch({ type: SET_USER, payload: { user: values.data } });
      },
    }
  );

  return mutation;
};

export default useEditUserDetails;
