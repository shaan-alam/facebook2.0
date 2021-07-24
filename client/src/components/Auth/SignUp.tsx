import React, { useState, useEffect } from "react";
import {
  Header,
  Form,
  Button,
  Input,
  Divider,
  Message,
  Icon,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { SignUpFormDataType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import GoogleLogin from "react-google-login";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearError } from "../../actions/error";
import { SIGN_UP } from "../../constants";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

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
      dispatch(clearError());
    }
  }, [error]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const successRedirect = () => history.push("/");

    dispatch(signUp(formData, successRedirect));
  };

  // Mutate state on form input change
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onGoogleSuccess = async (res: any) => {
    const {
      profileObj: { name, email },
    } = res;

    dispatch({
      type: "AUTH",
      payload: { profileObj: { name, email } },
    });

    history.push("/auth/setup-profile");
  };

  const onGoogleFailure = () => {
    // Dispatch an error action on Sign in component
    dispatch({
      type: "ERROR",
      payload: { ON: "SIGN_UP", message: "Something went wrong!" },
    });
  };

  return (
    <div className="auth-section">
      <Segment style={{ width: "500px" }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="signup" /> Sign Up
        </Header>
        {error.ON === "SIGN_UP" && error.message && (
          <Message negative>
            <Message.Header>{error.message}</Message.Header>
          </Message>
        )}
        <Form onSubmit={onFormSubmit}>
          <Form.Group widths={2}>
            <Form.Field>
              <label>First name</label>
              <Input
                fluid
                placeholder="First name"
                name="firstName"
                onChange={handleFormDataChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last name</label>
              <Input
                fluid
                placeholder="Last name"
                name="lastName"
                onChange={handleFormDataChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleFormDataChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleFormDataChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              placeholder="Repeat Password"
              type="password"
              name="confirmPassword"
              onChange={handleFormDataChange}
            />
          </Form.Field>
          <Button type="submit" primary size="small">
            Sign Up
          </Button>
          <Link
            to="/auth/signin"
            style={{ display: "block", marginTop: "1em" }}
          >
            Already have an account? Login
          </Link>
          <Divider horizontal>Or</Divider>
          <div style={{ width: "100%", textAlign: "center" }}>
            <GoogleLogin
              buttonText="Sign up with Google"
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

export default SignUp;
