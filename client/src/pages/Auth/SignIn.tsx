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
import PasswordField from "../../components/PasswordField";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useFormik } from "formik";
import * as yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Formik data here
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("You must provide valid email")
        .required("Email is required!"),
      password: yup.string().trim().required("Password is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      // Redirect to the Feed
      const successRedirect = () => history.push("/");

      const { email, password } = formik.values;

      dispatch(signIn({ email, password }, successRedirect));
    },
  });

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.token || profile.tokenId) {
      history.push("/");
    }
  }, []);

  // Google login success handler, to dispatch signInWithGoogle Action
  const onGoogleSuccess = async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    const successRedirect = () => history.push("/");

    dispatch(signInWithGoogle(email, imageUrl, successRedirect));
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
      <div className="p-6 rounded-lg flex sm:flex-row flex-col sm:w-full md:w-3/4">
        <div className="hero mb-6 block sm:mr-6 sm:w-full">
          <h1 className="text-fb text-4xl text-center sm:text-left sm:text-7xl font-extrabold">
            facebook
          </h1>
          <p className="text-lg text-center sm:text-left sm:text-xl my-3">
            Facebook helps you connect and share with people.
          </p>
        </div>
        <div className="login w-full sm:w-3/4 bg-white p-4 sm:p-10 rounded-lg shadow-md">
          <form onSubmit={formik.handleSubmit}>
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 font-semibold text-center py-2">
                {formik.errors.email}
              </div>
            )}
            <input
              type="text"
              className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
              placeholder="Your Email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 font-semibold text-center py-2">
                {formik.errors.password}
              </div>
            )}
            <PasswordField
              placeholder="Your Password"
              properties={{ ...formik.getFieldProps("password") }}
            />
            <button
              type="submit"
              className="flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
            >
              {formik.isSubmitting && (
                <Loader type="Oval" height={20} width={20} color="#fff" />
              )}
              &nbsp; Login
            </button>
            <div className="text-center mt-3">
              <Link to="/auth/signup" className="text-fb">
                New to Facebook? Create an Account
              </Link>
            </div>
            <div className="h-1 w-full my-8 bg-gray-200"></div>
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
