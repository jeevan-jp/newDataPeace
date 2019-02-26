import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Pagination extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    currentIndex: PropTypes.number,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {},
    currentIndex: 1
  };

  state = {
    //....
  };

  createDivision = () => {
    const { users } = this.props;
    const { currentIndex } = this.props;
    const totalPartitions = Math.ceil(users.length / 10);
    const count = [];
    for (let i = 0; i < totalPartitions; i++) {
      count.push(i + 1);
    }
    return count.map(index => {
      return (
        <PageBlock
          style={
            currentIndex === index - 1
              ? { background: "#2cbeff", color: "white" }
              : {}
          }
          onClick={() => {
            const from = (index - 1) * 10;
            const to = from + 10 > users.length ? users.length : from + 10;
            this.props.onClick(from, to);
          }}
          key={"page" + index}
        >
          {index}
        </PageBlock>
      );
    });
  };

  render() {
    return (
      <CustomPaginatorContainer>
        {this.props.users !== null ? this.createDivision() : ""}
      </CustomPaginatorContainer>
    );
  }
}

const CustomPaginatorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-left: none;
  color: #2cbeff;
  font-weight: bold;
  height: 30px;
`;

const PageBlock = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-left: 1px solid #d8d8d8;
  cursor: pointer;
  &:hover {
    background: #2cbeff;
    color: white;
  }
`;

export default Pagination;
