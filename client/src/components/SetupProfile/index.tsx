import React, { useState } from "react";
import {
  Header,
  Form,
  Button,
  Segment,
  Message,
  Icon,
} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signUpWithGoogle } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { FormDataType } from "./types";
import { Link } from "react-router-dom";

const SetupProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

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
    <div className="auth-section">
      <Segment style={{ width: "500px" }}>
        <Header as="h2" textAlign="center">
          One More Step to go!!
        </Header>
        <Header as="h4" textAlign="center">
          Help us setup your profile!
        </Header>
        {error.ON === "SETUP_PROFILE" && error.message && (
          <Message negative>
            <Message.Header>{error.message}</Message.Header>
          </Message>
        )}
        <Form onSubmit={handleFormSubmit}>
          <Form.Input readOnly>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormDataChange}
            />
          </Form.Input>
          <Form.Input readOnly>
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormDataChange}
            />
          </Form.Input>
          <Form.Input>
            <input
              placeholder="Choose a Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormDataChange}
            />
          </Form.Input>
          <Form.Input>
            <input
              placeholder="Repeat Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFormDataChange}
            />
          </Form.Input>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" primary size="small">
              <Icon name="check circle" /> Sign Up
            </Button>
            <Link to="/auth/signin">
              <Button type="submit" color="red" size="small">
                <Icon name="cancel" /> Cancel
              </Button>
            </Link>
          </div>
        </Form>
      </Segment>
    </div>
  );
};

export default SetupProfile;
