import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

class SearchBox extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number,
    initialTenUsers: PropTypes.array.isRequired,
    total: PropTypes.number,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    currentIndex: 0,
    total: 0,
    onSubmit: () => {}
  };

  // highlightText = results => {
  //   console.log(results);
  //   if (results.length) {
  //     results.forEach(res => {
  //       const element = document.getElementById(res.id).children[0];
  //       element.style.background = "#c2c";
  //     });
  //   }
  // };

  searchName = name => {
    const { initialTenUsers } = this.props;
    const results = [];
    initialTenUsers.forEach(user => {
      const currentName = user.first_name;
      if (name.length <= currentName.length) {
        const index = currentName.toLowerCase().indexOf(name.toLowerCase());
        const lastIndex = index + name.length;
        if (index !== -1) {
          results.push({ index, lastIndex, id: user.id });
        }
      }
    });
    this.props.onSubmit(results);
  };

  render() {
    const { currentIndex, total } = this.props;
    return (
      <StyledSearchContainer>
        <StyledInput
          placeholder="Search by first name"
          name="searchName"
          onChange={({ target: { value } }) => {
            this.searchName(value);
          }}
        />
        <div>
          {currentIndex * 10 + 1}
          {"-"}
          {(currentIndex + 1) * 10}
          {"/"}
          {total}
        </div>
      </StyledSearchContainer>
    );
  }
}

const StyledSearchContainer = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  min-width: 220px;
  padding-left: 5px;
  border: none;
  min-height: 30px;
  border-bottom: 2px solid #c2c2c2;
  outline: none;
  &:focus {
    border-bottom: 2px solid #00d0ff;
    transition: 0.5s ease all;
  }
`;

export default SearchBox;
