import { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";

// Interfaces and types
import { NavbarProps } from "./types";

const Navbar = ({ setIsOpen }: NavbarProps) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile") || "{}")
  );

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile") || "{}"));
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    setUser("");
    history.push("/auth/signin");
  };

  return (
    <nav>
      <div className="container">
        <h1>Social Media Logo</h1>
        <ul>
          <li>
            {(user.tokenId || user.token) && (
              <>
                <Button animated="fade" onClick={() => setIsOpen(true)}>
                  <Button.Content visible>Create post</Button.Content>
                  <Button.Content hidden>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
                <Button secondary onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
