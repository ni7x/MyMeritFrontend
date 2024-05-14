import {
  faListCheck,
  faReceipt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const UserProfileSidebar = () => {
  const { pathname } = useLocation();
  const navigation = [
    {
      name: "Profile",
      href: "/profile",
      icon: <FontAwesomeIcon className="h-6 w-6" icon={faUser} />,
      current: pathname === "/profile",
    },
    {
      name: "My tasks",
      href: "/profile/tasks",
      icon: <FontAwesomeIcon className="h-6 w-6" icon={faListCheck} />,
      current: pathname === "/profile/tasks",
    },
    {
      name: "Purchase history",
      href: "/profile/purchases",
      icon: <FontAwesomeIcon className="h-6 w-6" icon={faReceipt} />,
      current: pathname === "/profile/purchases",
    },
  ];
  return (
    <div className="absolute right-0 top-0 h-full">
      <div className="flex flex-col items-center w-16 sm:w-60 h-full overflow-hidden text-gray-400 bg-main-darker pt-16">
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full mt-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center w-full h-12 px-3 mt-2 rounded ${
                  item.current
                    ? "bg-main-bg-color text-gray-300"
                    : "hover:bg-main-bg-color hover:text-gray-300"
                }`}
              >
                {item.icon}
                <span className="hidden sm:block ml-2 text-sm font-medium">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
