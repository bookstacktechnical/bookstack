import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers,SearchCustomers} from "../../../backendapicalls/users";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";

function Users({ role }) {
 
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const [searchText = "", setSearchText = ""] = useState("");

  const getSearchCustomers = async () => {
   
    try {
      dispatch(ShowLoading());
  
    const response = await SearchCustomers(searchText);
    const response1 = await GetAllUsers(role);
  
      if (response.success) {
        setUsers(response.data);
      } else {
        //toast.error(response.message);
      }

      
      if (searchText==''&& response1.success) {
        setUsers(response1.data);
      } else {
        //toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
     // toast.error(error.message);
      dispatch(HideLoading());
    }


  };

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <Button
            title="Books"
            variant="outlined"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
       <div className="flex gap-5 mt-5 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/2"
          placeholder="Search Customer" 
        />
        <Button title="Search" onClick={getSearchCustomers} />
       
        
      </div>
      <br></br>
      <Table dataSource={users} columns={columns} />

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
