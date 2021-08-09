import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { useHistory, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/solid";
import { BellIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import User from "../../assets/svg/user.svg";

const Navbar = () => {
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
    setUser({});
    history.push("/auth/signin");
  };

  if (!user.token) return null;

  return (
    <nav className="border-b-2 border-gray-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-2">
        <div className="mr-8">
          <h4 className="text-fb font-bold">Facebook Clone</h4>
        </div>
        <div className="hidden sm:block flex-grow">
          <input
            type="text"
            className="bg-gray-100 py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Search..."
          />
        </div>
        <div className="relative flex items-center justify-between flex-2">
          <BellIcon className="h-9 w-9 mr-4 text-gray-400 cursor-pointer p-2 hover:bg-blue-50 rounded-full" />
          <Menu as="div" className="relative inline-block">
            <Menu.Button className="hover:bg-blue-50 p-2 rounded-lg flex items-center outline-none">
              <img
                src={user.user.avatar || User}
                alt={user.user.fullName}
                className="sm:mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
              />
              <p className="hidden sm:block">{user.user.fullName}</p>
              <ChevronDownIcon className="w-6 sm:ml-4" />
            </Menu.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-50 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform  scale-100 opacity-100"
              leaveTo="transform scale-50 opacity-0"
            >
              <Menu.Items className="z-10 outline-none shadow-md absolute right-0 bg-white h-auto flex flex-col w-56 p-1 rounded-md">
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
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
