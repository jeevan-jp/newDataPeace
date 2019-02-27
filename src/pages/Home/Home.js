import React from "react";
import UserList from "../../services/UserList";
import styled from "styled-components";

import UserTable from "./Components/UserTable";
import Loader from "../../components/Loader";

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
      console.log("error fetching users");
    }
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <Header>Data Peace</Header>
        {users !== null ? (
          <StyledContainer>
            <UserTable users={users} {...this.props} />
          </StyledContainer>
        ) : (
          <Loader />
        )}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export default Home;
