import axios from "axios";

const UserList = async props => {
  try {
    const { data } = await axios.get("http://demo9197058.mockable.io/users");
    console.log(data);
    return data;
  } catch {
    console.log("Error in fetching data...");
  }
};

export default UserList;
