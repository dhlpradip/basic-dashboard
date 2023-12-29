import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import "../../styles/sidebar.css";
import { Link, Outlet, useLocation } from "react-router-dom";


export const Sidebar = () => {
  const location = useLocation();

  console.log({location})
  return (
    <>
      <div className="sidebar">
        <h2>Demo Site</h2>
        <Link to="/" className={location.pathname === "/" ? "sidebar-link-active" :  "sidebar-link"} >
          {" "}
          <LuLayoutDashboard className={location.pathname === "/" ? "icon-active" :  "icon"} /> <span>Dashboard</span>
        </Link>
        <Link to="/users" className={location.pathname.match("/users") ? "sidebar-link-active" :  "sidebar-link"} >
          {" "}
          <LuUsers className={location.pathname.match("/users") ? "icon-active" :  "icon"} /> <span>Users</span>
        </Link>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </>
  );
};
