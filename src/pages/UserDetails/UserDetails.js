import React from "react";
import styled from "styled-components";

import Loader from "../../components/Loader";
import UserList from "../../services/UserList";

class UserDetails extends React.Component {
  state = {
    users: null,
    currentUser: null
  };

  componentDidMount() {
    this.getUsers();
  }

  // fetch Users from api
  getUsers = async () => {
    try {
      const data = await UserList();
      const id = parseInt(this.props.match.params.id, 10);
      if (!isNaN(id)) {
        const currentUser = data[id - 1];
        this.setState({ users: data, currentUser });
      } else {
        this.setState({ users: data });
      }
    } catch {
      console.log("error fetching users");
    }
  };

  render() {
    const { currentUser } = this.state;
    return currentUser != null ? (
      <UserDetailsContainer>
        <Name>
          {currentUser.first_name} {currentUser.last_name}
        </Name>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>Company Name</div>
          <div>{currentUser.company_name}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>City</div>
          <div>{currentUser.city}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>State</div>
          <div>{currentUser.state}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>ZIP</div>
          <div>{currentUser.zip}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>Email</div>
          <div>{currentUser.email}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>Website</div>
          <div>{currentUser.web}</div>
        </StyledUserFields>
        <StyledUserFields>
          <div style={{ fontWeight: "bold" }}>Age</div>
          <div>{currentUser.age}</div>
        </StyledUserFields>
      </UserDetailsContainer>
    ) : (
      <Loader />
    );
  }
}

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5%;
`;

const StyledUserFields = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  border-bottom: 2px solid #ffbbd2;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 15px;
`;

export default UserDetails;
