import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearError } from "../../actions/error";
import { SIGN_UP } from "../../constants";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import GoogleAuth from "../../components/GoogleAuth";
import Button from "../../components/Button";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      fullName: yup.string().trim().required("Full name is required!"),
      email: yup
        .string()
        .email("You must provide a valid email!")
        .required("Email is required!"),
      password: yup.string().min(6, "Password must be 6 characters or more!"),
      confirmPassword: yup
        .string()
        .min(6, "Password must be 6 characters or more!")
        .oneOf([yup.ref("password")], "The two passwords should match"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const successRedirect = () => history.push("/");

      dispatch(signUp(values, successRedirect));
    },
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
      formik.setSubmitting(false);
      dispatch(clearError());
    }
  }, [error]);

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
            <FormInput
              as="normal"
              type="text"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="fullName"
              name="fullName"
              formik={formik}
              placeholder="Full Name"
            />
            <FormInput
              as="normal"
              type="text"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="email"
              name="email"
              formik={formik}
              placeholder="Email"
            />
            <FormInput
              as="password"
              type="password"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="password"
              name="password"
              formik={formik}
              placeholder="Password"
            />
            <FormInput
              as="password"
              type="password"
              className="mr-3 focus:ring-2 focus:ring-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
              id="confirmPassword"
              name="confirmPassword"
              formik={formik}
              placeholder="Repeat Password"
            />
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              text="Sign up"
              variant="primary"
              className="py-2 px-4"
            />
            <div className="text-center mt-3">
              <Link to="/auth/signin" className="text-fb">
                Already have an account? Login
              </Link>
            </div>
            <div className="h-1 w-full my-4 bg-gray-200"></div>
            <GoogleAuth />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
