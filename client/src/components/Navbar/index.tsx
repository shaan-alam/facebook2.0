import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

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

  if (!user.tokenId) return null;

  return (
    <nav className="border-b-2 border-gray-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-2">
        <div className="mr-8">
          <h4 className="text-fb font-bold">Facebook Clone</h4>
        </div>
        <div className="hidden sm:block flex-grow">
          <input
            type="text"
            className="bg-gray-50 py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Search..."
          />
        </div>
        <div className="relative flex items-center justify-between flex-2">
          <BellIcon className="h-9 w-9 mr-4 text-gray-400 cursor-pointer p-2 hover:bg-blue-50 rounded-full" />
          <Menu>
            <Menu.Button className="hover:bg-blue-50 p-2 rounded-lg flex items-center outline-none">
              <img
                src={user.profileObj.imageUrl}
                alt="Shaan Alam"
                className="sm:mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
              />
              <p className="hidden sm:block">Shaan Alam</p>
              <ChevronDownIcon className="w-6 sm:ml-4" />
            </Menu.Button>

            <Menu.Items className="z-10 outline-none shadow-md absolute top-12 right-0 bg-white h-auto flex flex-col w-56 p-1 rounded-md">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`flex items-center ${
                      active && "bg-fb rounded-lg"
                    } p-2 ${
                      active ? "text-white" : "text-gray-700 "
                    } hover:bg-fb hover:text-white`}
                    href="/account-settings"
                  >
                    <UserIcon
                      className={`h-4 w-4 mr-2 ${
                        active ? "text-white" : "text-fb"
                      }`}
                    />
                    &nbsp; My Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/auth/signin"
                    className={`flex items-center ${
                      active && "bg-fb rounded-lg"
                    } p-2 ${
                      active ? "text-white" : "text-gray-700 "
                    } hover:bg-fb hover:text-white`}
                    onClick={handleLogout}
                  >
                    <LogoutIcon
                      className={`h-4 w-4 mr-2 ${
                        active ? "text-white" : "text-fb"
                      }`}
                    />
                    &nbsp; Sign out
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
