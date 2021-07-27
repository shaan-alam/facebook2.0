import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUpWithGoogle } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import { FormDataType } from "./types";
import { Link } from "react-router-dom";
import PasswordField from "../PasswordField";
import { UserAddIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { Flip, toast, ToastContainer } from "react-toastify";
import { SETUP_PROFILE } from "../../../constants";
import { clearError } from "../../../actions/error";

const SetupProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

  useEffect(() => {
    // Show error if error exists for this component in the redux store.
    const showError = () => {
      toast.error(error.message, {
        transition: Flip,
      });
    };

    if (error.ON === SETUP_PROFILE && error.message) {
      showError();
      dispatch(clearError());
    }
  }, [error]);

  const profile = useSelector(
    (state: RootState) => state.auth.authData.profileObj
  ) as { email: string; name: string };

  const [formData, setFormData] = useState<FormDataType>({
    name: profile?.name,
    email: profile?.email,
    password: "",
    confirmPassword: "",
  });

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const successRedirect = () => history.push("/");

    dispatch(signUpWithGoogle(formData, successRedirect));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-10 text-center w-96">
        <h1 className="font-bold text-fb text-2xl mb-3">
          One more step to go.
        </h1>
        <h5 className="text-gray-500 mb-4">Help us build your profile!</h5>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={formData.name}
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
          />
          <input
            type="email"
            value={formData.email}
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
          />
          <PasswordField
            formData={formData}
            name="password"
            placeholder="Choose a Password"
            handleFormDataChange={handleFormDataChange}
          />
          <PasswordField<FormDataType>
            formData={formData}
            name="confirmPassword"
            placeholder="Repeat Password"
            handleFormDataChange={handleFormDataChange}
          />
          <button
            type="submit"
            className="flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
          >
            <UserAddIcon className="h-6 mr-3" /> Sign me Up
          </button>
          <Link to="/auth/signin">
            <button className="flex items-center justify-center outline-none focus:ring-4 focus:ring-gray-400 bg-gray-300  w-full rounded-lg text-black py-2 px-4 hover:bg-gray-500 hover:text-white mt-3">
              <XIcon className="h-6 mr-3" />
              Cancel
            </button>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetupProfile;
