import React from "react";
import styled from "styled-components";
import UserList from "../../../../services/UserList";
import PropTypes from "prop-types";

class UserTable extends React.Component {
  static propTypes = {
    users: PropTypes.object.isRequired
  };

  render() {
    return (
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTh>First Name</StyledTh>
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
          {this.props.users.map(user => {
            return (
              <StyledTr>
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
  }
`;

export default UserTable;
