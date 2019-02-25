import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Container>
    <Image src={require("../../images/404.svg")} />
    <h1>You are Lost</h1>
    <Link to="/">
      <Icon name="arrow left" />
      Back To Home
    </Link>
  </Container>
);

export default NotFound;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 400px;
`;
