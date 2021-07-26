import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignInFormDataType } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signInWithGoogle } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import GoogleLogin from "react-google-login";
import { SIGN_IN } from "../../constants";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearError } from "../../actions/error";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

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

    if (error.ON === SIGN_IN && error.message) {
      showError();
      dispatch(clearError());
    }
  }, [error]);

  // Form state data
  const [formData, setFormData] = useState<SignInFormDataType>({
    email: "",
    password: "",
  });

  // Mutate state on form input change
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // On form submit, dispatch a signin event
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const successRedirect = () => history.push("/");

    dispatch(signIn(formData, successRedirect));
  };

  // Google login success handler, to dispatch signInWithGoogle Action
  const onGoogleSuccess = async (res: any) => {
    const {
      profileObj: { email },
    } = res;

    const successRedirect = () => history.push("/");

    dispatch(signInWithGoogle(email, successRedirect));
  };

  const onGoogleFailure = () => {
    // Dispatch an error action on Sign in component
    dispatch({
      type: "ERROR",
      payload: { ON: "SIGN_IN", message: "Something went wrong!" },
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
            <input
              type="text"
              className="bg-gray-200 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
            <input
              type="password"
              className="bg-gray-200 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              placeholder="Your Password"
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
            />
            <button
              type="submit"
              className="outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
            >
              Login
            </button>
            <div className="text-center mt-3">
              <Link to="/auth/signup" className="text-fb">
                New to Facebook? Create an Account
              </Link>
            </div>
            <div className="h-1 w-full my-4 bg-gray-200"></div>
            <div className="text-center">
              <GoogleLogin
                theme="dark"
                buttonText="Sign in with Google"
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

export default SignIn;
