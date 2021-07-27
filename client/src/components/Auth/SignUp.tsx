import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUpFormDataType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearError } from "../../actions/error";
import { AUTH, SIGN_UP } from "../../constants";
import PasswordField from "./PasswordField";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<SignUpFormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.token || profile.tokenId) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    // Show error if error exists for this component in the redux store.
    const showError = () => {
      toast.error(error.message, {
        transition: Flip,
      });
    };

    if (error.ON === SIGN_UP && error.message) {
      showError();
      setIsLoading(false);
      dispatch(clearError());
    }
  }, [error]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const successRedirect = () => history.push("/");

    dispatch(signUp(formData, successRedirect));
  };

  // Mutate state on form input change
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onGoogleSuccess = async (res: any) => {
    const {
      profileObj: { name, email, imageUrl },
    } = res;

    dispatch({
      type: AUTH,
      payload: { profileObj: { name, email, imageUrl } },
    });

    history.push("/auth/setup-profile");
  };

  const onGoogleFailure = () => {
    // Dispatch an error action on Sign in component
    dispatch({
      type: "ERROR",
      payload: { ON: SIGN_UP, message: "Something went wrong!" },
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="p-6 rounded-lg flex sm:flex-row flex-col">
        <div className="hero mb-6 block sm:mr-6">
          <h1 className="text-fb text-4xl text-center sm:text-left sm:text-7xl font-extrabold">
            facebook
          </h1>
          <p className="text-lg text-center sm:text-left sm:text-xl my-3">
            Facebook helps you connect and share with people.
          </p>
        </div>
        <div className="login w-full sm:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <form onSubmit={handleFormSubmit}>
            <div className="flex">
              <input
                type="text"
                className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormDataChange}
              />
              <input
                type="text"
                className="focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormDataChange}
              />
            </div>
            <input
              type="text"
              className="focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
            <PasswordField<SignUpFormDataType>
              formData={formData}
              name="password"
              placeholder="Choose a Password"
              handleFormDataChange={handleFormDataChange}
            />
            <PasswordField<SignUpFormDataType>
              formData={formData}
              name="confirmPassword"
              placeholder="Repeat Password"
              handleFormDataChange={handleFormDataChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
            >
              {isLoading && (
                <Loader type="Oval" height={20} width={20} color="#fff" />
              )}
              &nbsp; Sign up
            </button>
            <div className="text-center mt-3">
              <Link to="/auth/signin" className="text-fb">
                Already have an account? Login
              </Link>
            </div>
            <div className="h-1 w-full my-4 bg-gray-200"></div>
            <div className="text-center">
              <GoogleLogin
                theme="dark"
                buttonText="Sign up with Google"
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
