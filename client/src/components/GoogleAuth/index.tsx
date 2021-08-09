import GoogleLogin from "react-google-login";
import * as api from "../../api";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onGoogleSuccess = async (res: any) => {
    const { email, name, imageUrl } = res?.profileObj;

    try {
      const { data } = await api.getUserFromDB(email);

      // If a user is returned from the backend, that means user has
      // already registered with that email, So Sign him in
      if (data.user) {
        const { user, token } = data;
        dispatch({ type: AUTH, payload: { user, token } });

        // Redirect to the Feed
        history.push("/");
      } else {
        // Else, redirect him to the setup profile component, to
        // finish his signup process
        history.push("/auth/setup-profile", {
          email,
          name,
          imageUrl,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        transition: Flip,
      });
    }
  };

  const onGoogleFailure = (err: any) => {
    toast.error(err, {
      transition: Flip,
    });
  };

  return (
    <div className="text-center">
      <GoogleLogin
        theme="dark"
        buttonText="Sign in with Google"
        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
        onSuccess={onGoogleSuccess}
        onFailure={onGoogleFailure}
      />
      <ToastContainer />
    </div>
  );
};

export default GoogleAuth;
