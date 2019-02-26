import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Pagination from "./Pagination";

class UserTable extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  state = {
    currentUsers: [],
    currentIndex: null
  };

  componentDidMount() {
    this.sliceUsers(0, 9);
  }

  sliceUsers(from, to) {
    const { users } = this.props;
    if (users !== null) {
      const selectedUsers = [];
      for (let i = from; i < to; i++) {
        selectedUsers.push(users[i]);
      }
      this.setState({ currentUsers: selectedUsers, currentIndex: from / 10 });
    }
  }

  nextTen = () => {
    const { currentIndex } = this.state;
    const { users } = this.props;
    if (currentIndex != null) {
      const from = (currentIndex + 1) * 10;
      const to = from + 10 > users.length ? users.length : from + 10;
      this.sliceUsers(from, to);
    }
  };

  prevTen = () => {
    const { currentIndex } = this.state;
    const { users } = this.props;
    if (currentIndex != null) {
      const from = (currentIndex - 1) * 10;
      const to = from + 10 > users.length ? users.length : from + 10;
      this.sliceUsers(from, to);
    }
  };

  sortBy = category => {
    console.log(category);
  };

  render() {
    const { currentUsers, currentIndex } = this.state;
    const { users } = this.props;
    return (
      <div>
        <StyledTable>
          <thead>
            <StyledTr style={{ background: "#808080ba" }}>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("fname");
                  }}
                >
                  &#9662;
                </StyledSortIcon>
                First Name
              </StyledTh>
              <StyledTh>Last Name</StyledTh>
              <StyledTh>Company Name</StyledTh>
              <StyledTh>City</StyledTh>
              <StyledTh>State</StyledTh>
              <StyledTh>ZIP</StyledTh>
              <StyledTh>Email</StyledTh>
              <StyledTh>Web</StyledTh>
              <StyledTh>Age</StyledTh>
            </StyledTr>
          </thead>
          <tbody>
            {currentUsers.map(user => {
              return (
                <StyledTr key={user.email}>
                  <StyledTd>{user.first_name}</StyledTd>
                  <StyledTd>{user.last_name}</StyledTd>
                  <StyledTd>{user.company_name}</StyledTd>
                  <StyledTd>{user.city}</StyledTd>
                  <StyledTd>{user.state}</StyledTd>
                  <StyledTd>{user.zip}</StyledTd>
                  <StyledTd>{user.email}</StyledTd>
                  <StyledTd>{user.web}</StyledTd>
                  <StyledTd>{user.age}</StyledTd>
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>

        <div>
          <StyledButtonContainer>
            <StyledButton
              disabled={currentIndex === 0}
              onClick={() => {
                this.prevTen();
              }}
            >
              Previous
            </StyledButton>
            <StyledButton
              disabled={currentIndex === Math.ceil(users.length / 10) - 1}
              onClick={() => {
                this.nextTen();
              }}
            >
              Next
            </StyledButton>
          </StyledButtonContainer>
          <PaginationContainer>
            <Pagination
              users={this.props.users}
              onClick={(from, to) => {
                this.sliceUsers(from, to);
              }}
            />
          </PaginationContainer>
        </div>
      </div>
    );
  }
}

const StyledTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const StyledTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
    cursor: pointer;
  }
  &:hover {
    background: #ade6ff;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 20px 0;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 28px;
  border-radius: 20px;
  border: 2px solid #00d0ff;
  background: white;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #00d0ff;
    color: white;
    transition: all 0.2s;
  }
  &:active {
    transform: translateX(1px);
    transform: translateY(1px);
  }
`;

const StyledSortIcon = styled.span`
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

export default UserTable;
