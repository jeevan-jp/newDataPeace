import React from "react";
import UserList from "../../services/UserList";
import styled from "styled-components";
import UserTable from "./Components/UserTable/UserTable";

class Home extends React.Component {
  state = {
    users: null
  };

  componentDidMount() {
    this.getUsers();
  }

  // fetch Users from api
  getUsers = async () => {
    try {
      const data = await UserList();
      this.setState({ users: data });
    } catch {
      console.log("error fetching Users");
    }
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <Header>Data Peace</Header>
        <StyledContainer>
          <div>Hello Data Peace</div>
          {users !== null ? <UserTable users={users} /> : "Loading..."}
        </StyledContainer>
      </div>
    );
  }
}

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 60px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #2cbeff;
`;

const StyledContainer = styled.div`
  margin: 0 30px;
  width: 95%;
`;

export default Home;
