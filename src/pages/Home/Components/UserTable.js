import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Pagination from "./Pagination";
import SearchBox from "./SearchBox";

class UserTable extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    initialTenUsers: [],
    currentUsers: [],
    currentIndex: null
  };

  componentDidMount() {
    this.sliceUsers(0, 10);
  }

  sliceUsers(from, to) {
    const { users } = this.props;
    if (users !== null) {
      const selectedUsers = [];
      for (let i = from; i < to; i++) {
        selectedUsers.push(users[i]);
      }
      this.setState({
        currentUsers: selectedUsers,
        initialTenUsers: selectedUsers,
        currentIndex: from / 10
      });
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
    const { currentUsers } = this.state;
    const SetOfSelectedFields = new Set();
    currentUsers.forEach(user => SetOfSelectedFields.add(user[category]));
    const ArrayOfSelectedFields = [];
    for (let i of SetOfSelectedFields) {
      ArrayOfSelectedFields.push(i);
    }
    ArrayOfSelectedFields.sort();
    let sortedList = [];
    ArrayOfSelectedFields.forEach(field => {
      const AllOccurences = currentUsers.filter(
        user => user[category] === field
      );
      sortedList = [...sortedList, ...AllOccurences];
    });
    this.setState({ currentUsers: sortedList });
  };

  render() {
    const { currentUsers, initialTenUsers, currentIndex } = this.state;
    const { users } = this.props;
    return (
      <div>
        <SearchBox
          initialTenUsers={initialTenUsers}
          currentIndex={currentIndex}
          total={users.length}
          onSubmit={results => {
            const ids = results.map(res => res.id);
            const filteredUsers = initialTenUsers.filter(
              user => ids.indexOf(user.id) > -1
            );
            this.setState({ currentUsers: [...filteredUsers] });
          }}
        />
        <StyledTable>
          <thead>
            <StyledTr style={{ background: "#808080ba" }}>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("first_name");
                  }}
                >
                  &#9662;
                </StyledSortIcon>
                First Name
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("last_name");
                  }}
                >
                  &#9662;
                </StyledSortIcon>
                Last Name
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("company_name");
                  }}
                >
                  &#9662; Company Name
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("city");
                  }}
                >
                  &#9662; City
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("state");
                  }}
                >
                  &#9662; State
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("zip");
                  }}
                >
                  &#9662; ZIP
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("email");
                  }}
                >
                  &#9662; Email
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("web");
                  }}
                >
                  &#9662; Web
                </StyledSortIcon>
              </StyledTh>
              <StyledTh>
                <StyledSortIcon
                  onClick={() => {
                    this.sortBy("age");
                  }}
                >
                  &#9662; Age
                </StyledSortIcon>
              </StyledTh>
            </StyledTr>
          </thead>
          <tbody>
            {users.length
              ? currentUsers.map(user => {
                  return (
                    <StyledTr
                      key={user.id}
                      id={user.id}
                      onClick={() => {
                        this.props.history.push(`/users/${user.id}`);
                      }}
                    >
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
                })
              : ""}
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
              currentIndex={currentIndex}
              onClick={(from, to) => {
                this.sliceUsers(from, to);
              }}
              changeCurrentIndex={currentIndex => {
                const from = currentIndex * 10;
                const to = from + 10 > users.length ? users.length : from + 10;
                this.setState({ currentIndex });
                this.sliceUsers(from, to);
              }}
              {...this.props}
            />
          </PaginationContainer>
        </div>
      </div>
    );
  }
}

const StyledTable = styled.table`
  overflow-x: auto;
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
  cursor: pointer;
  &:nth-child(even) {
    background-color: #dddddd;
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
