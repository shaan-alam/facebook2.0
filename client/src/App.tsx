import { useState } from "react";
import Navbar from "./components/Navbar";
import PostContainer from "./components/PostContainer";
import "./assets/css/styles.css";

import { useDispatch } from "react-redux";
import FormModal from "./components/FormModal";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import SetupProfile from "./components/SetupProfile";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

import "react-toastify/dist/ReactToastify.css";

interface User {
  tokenId: string;
  profileObj: any;
}

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentID, setCurrentID] = useState<string>("");
  const [user, setUser] = useState<User>({ tokenId: "", profileObj: {} });

  const dispatch = useDispatch();

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
