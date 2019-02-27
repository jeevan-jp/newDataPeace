import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Pagination extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    currentIndex: PropTypes.number,
    onClick: PropTypes.func,
    changeCurrentIndex: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {},
    changeCurrentIndex: () => {},
    currentIndex: 1
  };

  state = {
    currentPartitionIndex: 1
  };

  createDivision = () => {
    const { users, currentIndex } = this.props;
    const { currentPartitionIndex } = this.state;
    const totalPartitions = Math.ceil(users.length / 10);
    const from = (currentPartitionIndex - 1) * 10 + 1;
    const to = from + 10 <= totalPartitions + 1 ? from + 10 : totalPartitions;
    const count = [];
    for (let i = from; i < to; i++) {
      count.push(i);
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
        <PageBlock
          onClick={() => {
            const { currentPartitionIndex } = this.state;
            if (currentPartitionIndex > 1) {
              this.setState({
                currentPartitionIndex: currentPartitionIndex - 1
              });
              this.props.changeCurrentIndex((currentPartitionIndex - 2) * 10);
            }
          }}
        >
          &#9666;&#9666;
        </PageBlock>
        {this.props.users.length !== null ? this.createDivision() : ""}
        <PageBlock
          onClick={() => {
            const { currentPartitionIndex } = this.state;
            const totalPartitions = Math.ceil(this.props.users.length / 100);
            if (currentPartitionIndex < totalPartitions) {
              this.setState({
                currentPartitionIndex: currentPartitionIndex + 1
              });
              this.props.changeCurrentIndex(currentPartitionIndex * 10);
            }
          }}
        >
          &#9656;&#9656;
        </PageBlock>
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
