import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostContainer from "./pages/Feed";

import { useDispatch } from "react-redux";
import FormModal from "./components/FormModal";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import SetupProfile from "./pages/Auth/SetupProfile";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import "react-toastify/dist/ReactToastify.css";
import { AUTH } from "./constants";

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentID, setCurrentID] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    dispatch({ type: AUTH, payload: profile });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar setIsOpen={setIsOpen} />
        <Switch>
          <PrivateRoute path="/" exact>
            <PostContainer setIsOpen={setIsOpen} setCurrentID={setCurrentID} />
          </PrivateRoute>
          <Route path="/auth/signin">
            <SignIn />
          </Route>
          <Route path="/auth/signup">
            <SignUp />
          </Route>
          <Route path="/auth/setup-profile">
            <SetupProfile />
          </Route>
        </Switch>
      </BrowserRouter>

      {isOpen && (
        <FormModal
          isOpen={isOpen}
          setOpen={setIsOpen}
          currentID={currentID}
          setCurrentID={setCurrentID}
        />
      )}
    </>
  );
};

export default App;
