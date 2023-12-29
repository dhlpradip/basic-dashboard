import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../../styles/userdetail.css";

const UserDetail = () => {
  const [userData, setUserData] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { combinedData } = useContext(DataContext);
  const { id } = useParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (id) {
      if (combinedData) {
        const data = combinedData.find((item) => item.id === parseInt(id));
        setUserData(data);
      }
    }
  }, [combinedData, id]);


  if (!userData) {
    return "Loading...";
  }
  return (
    <>
      <div className="top-bar">
        <h3>User Detail</h3>
      </div>
      <div className="main-content">
        <div className="user-container">
          <div  className="card">
            <div className="grid-container">
              <div className="grid-item">
              <strong>Full Name: </strong>{userData.first_name} {userData.middle_name} {userData.last_name}
                
              </div>
              <div className="grid-item">
              <strong>Username:</strong> {userData.username}
              </div>
              <div className="grid-item">
                <strong>Email:</strong> {userData.email}
              </div>
              <div className="grid-item">
                <strong>Password:</strong>{" "}
                {showPassword ? userData.password : "*********"}
                <span onClick={togglePasswordVisibility} className="eye-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="grid-item">
                <strong>Active:</strong>{" "}
                {userData.active === "1" ? "True" : "False"}
              </div>
              <div className="grid-item">
                <strong>Date Joined:</strong>{" "}
                {new Date(
                  parseInt(userData.join_date, 10) * 1000
                ).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="card">
          <h3>Address Detail</h3>
            <div className="">
              <div className="grid-item">
                <strong>Address:</strong> {userData.address}
              </div>
              <div className="grid-item">
                <strong>Country:</strong> {userData.country}
              </div>
            </div>
          </div>

          {userData.package !== "-" && (
            <div className="card">
                <h3>Subscription Detail</h3>
              <div className="">
                <div className="grid-item">
                  <strong>Package:</strong> {userData.package}
                </div>
                <div className="grid-item">
                  <strong>Expires On:</strong>{" "}
                  {new Date(userData.expires_on).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
