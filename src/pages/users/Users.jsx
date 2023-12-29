import { useContext } from "react";
import Table from "../../components/table/Table";
import { DataContext } from "../../context/dataContext";
import {FcApproval, FcHighPriority} from "react-icons/fc"
import {useNavigate} from "react-router-dom"

const Users = () => {
  const { combinedData, isLoading, error, setPageTitle } = useContext(DataContext);
  const navigate = useNavigate();

  setPageTitle("Users");

  const onRowClick = (value)=>{
    navigate(`/users/${value.id}`)
  }

  const columns = [
    { Header: "ID", accessor: "id", width: 80, Filter: false },
    {
      Header: "Active",
      accessor: "active",
      width: 100,
      Filter: false,
      Cell: ({ row }) => {
        return(
            <>{row.original.active === "1" ? (
                <FcApproval title="Active"/>
            ) : <FcHighPriority title="Inactive"/>}</>
        )
    },
    },
    { Header: "Username", accessor: "username", width: 150 },
    { Header: "First Name", accessor: "first_name" },
    { Header: "Last Name", accessor: "last_name" },
    { Header: "Subscription", accessor: "package" },
    { Header: "Expires on", accessor: "expires_on", Filter: false },
  ];

  return (
    <>
      <div className="main-content">
        <p className="muted">Click on each row for user details</p>
        <Table
          columns={columns}
          data={combinedData}
          isLoading={isLoading}
          error={error}
          onRowClick={onRowClick}
        />
      </div>
    </>
  );
};

export default Users;