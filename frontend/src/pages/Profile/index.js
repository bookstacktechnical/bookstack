import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import Reports from "./Reports";
import { useSelector } from "react-redux";
import BasicDetails from "./BasicDetails";
import BorrowedBooks from "./BorrowedBooks";
import ContactUs from "./ContactUs";
const TabPane = Tabs.TabPane;

function Profile() {
  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General" key="1">
          <BasicDetails />
        </TabPane>

        {role === "customer" && (
             <TabPane tab="Books Borrowed" key="2">
             <BorrowedBooks />
           </TabPane>
        )}

        {role !== "customer" && (
          <TabPane tab="Books" key="3">
            <Books />
          </TabPane>
        )}
        {role !== "customer" && (
          <TabPane tab="customer" key="4">
            <Users role="customer" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Librarians" key="5">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admins" key="6">
            <Users role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Reports" key="7">
            <Reports />
          </TabPane>
          
        )}
         {role === "customer" && (
          <TabPane tab="ContactUs" key="8">
            <ContactUs role="customer" />
          </TabPane>
        )}
        
      </Tabs>
    </div>
  );
}

export default Profile;
