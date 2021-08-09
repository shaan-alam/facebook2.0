import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/index";
import { Link } from "react-router-dom";
import { UserAddIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { Flip, toast, ToastContainer } from "react-toastify";
import { SETUP_PROFILE } from "../../../constants";
import { clearError } from "../../../actions/error";
import FormInput from "../../../components/FormInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { googleAuthentication } from "../../../actions/auth";
import Loader from "../../../assets/svg/loader.svg";
import { RouteState } from "./types";

const SetupProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state }: RouteState = useLocation();
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

  const formik = useFormik({
    initialValues: {
      fullName: state?.name,
      email: state?.email,
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      fullName: yup.string().trim().required("Full name is required!"),
      email: yup
        .string()
        .email("You must provide a valid email!")
        .required("Email is required!"),
      password: yup
        .string()
        .min(6, "Password must be 6 characters or more!")
        .required("Please choose a Password"),
      confirmPassword: yup
        .string()
        .min(6, "Password must be 6 characters or more!")
        .oneOf([yup.ref("password")], "The two passwords should match")
        .required("Please choose a Password"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const formData = {
        ...values,
        avatar: state?.imageUrl,
      };

      const redirect = () => history.push("/");

      dispatch(googleAuthentication(formData, redirect));
    },
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white rounded-lg shadow-md p-10 text-center w-96">
        <h1 className="font-bold text-fb text-2xl mb-3">
          One more step to go.
        </h1>
        <h5 className="text-gray-500 mb-4">Help us build your profile!</h5>
        <div className="flex justify-center my-6">
          <img
            src={state?.imageUrl}
            alt={state?.name}
            className="rounded-full"
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <FormInput
            as="normal"
            id="fullName"
            name="fullName"
            type="text"
            formik={formik}
            disabled={true}
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
          />
          <FormInput
            as="normal"
            id="email"
            name="email"
            type="email"
            formik={formik}
            disabled={true}
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
          />
          <FormInput
            as="password"
            id="password"
            name="password"
            type="password"
            formik={formik}
            placeholder="Choose a Password"
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
          />
          <FormInput
            as="password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            formik={formik}
            placeholder="Repeat Password"
            className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
          >
            {formik.isSubmitting ? (
              <img src={Loader} />
            ) : (
              <>
                <UserAddIcon className="h-6 mr-3" /> Sign me Up
              </>
            )}
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
