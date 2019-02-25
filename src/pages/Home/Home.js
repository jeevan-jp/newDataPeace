import React from "react";
import UserList from "../../services/UserList";
import styled from "styled-components";

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
      const { data } = await UserList();
      this.setState({ users: data });
    } catch {
      console.log("error fetching Users");
    }
  };

  render() {
    const { users } = this.state;
    return (
      <StyledContainer>
        <div>Hello Data Peace</div>
        <div>alsdfllas</div>
        {users !== null ? JSON.stringify(users[0]) : "Loading..."}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  padding: 0 30px;
  width: 95%;
`;

export default Home;
