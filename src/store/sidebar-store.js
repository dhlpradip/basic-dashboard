import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
const sidebarItems = () => {
  return [
      {
        icon: <LuLayoutDashboard className="icon"/>,
        title: "Dashboard",
        pathname: "/",
      },
      {
        icon: <LuUsers className="icon"/>,
        title: "Users",
        pathname: "/users",
      },
    ]
};

export { sidebarItems };
