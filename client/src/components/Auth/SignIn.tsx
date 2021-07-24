import React, { useState, useEffect } from "react";
import {
  Header,
  Form,
  Button,
  Divider,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
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
  const onFormSubmit = (e: React.FormEvent) => {
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

  const notify = () => {
    toast.error("heelo", {
      transition: Flip,
    });
  };

  return (
    <div className="auth-section">
      <Segment style={{ width: "500px" }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="sign in" />
          Sign In
        </Header>
        <Form onSubmit={onFormSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
            />
          </Form.Field>
          <Button type="submit" primary size="small">
            Sign In
          </Button>
          <Link
            to="/auth/signup"
            style={{ display: "block", marginTop: "1em" }}
          >
            Don't have an account? Sign Up
          </Link>
          <Divider horizontal>Or</Divider>
          <div style={{ width: "100%", textAlign: "center" }}>
            <GoogleLogin
              buttonText="Sign in with Google"
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
            />
          </div>
        </Form>
      </Segment>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
