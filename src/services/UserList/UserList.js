import React from "react";
import axios from "axios";

const UserList = async props => {
  try {
    const data = await axios.get("http://demo9197058.mockable.io/users");
    return data;
  } catch {
    console.log("Error in fetching data...");
  }
};

export default UserList;
