import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext";
import { sidebarItems } from "../../store/sidebar-store";
import "../../styles/sidebar.css";

export const Sidebar = () => {
  const { pageTitle } = useContext(DataContext);
  const sidebarItemList = sidebarItems();

  return (
    <>
      <div className="sidebar">
        <h2>Demo Site</h2>
        {sidebarItemList.map((item, index) => (
          <NavLink key={index} to={item.pathname} className="sidebar-link">
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
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
