import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { sidebarItems } from "../../store/sidebar-store";
import "../../styles/sidebar.css";

export const Sidebar = () => {
  const location = useLocation();
  const { pageTitle } = useContext(DataContext);
  const sidebarItemList = sidebarItems();
  const pathToCompare = location.pathname === "/" ? "/" : "/users";
  
  return (
    <>
      <div className="sidebar">
        <h2>Demo Site</h2>
        {sidebarItemList.map((item, index) => (
          <Link
            key={index}
            to={item.pathname}
            className={
              `sidebar-link ` +
              (pathToCompare === item.pathname ? "active" : "")
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="content">
        <div className="top-bar">
          <h3 className="page-title">{pageTitle}</h3>
        </div>
        <Outlet />
      </div>
    </>
  );
};
