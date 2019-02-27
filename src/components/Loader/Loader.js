import React from "react";
import styled from "styled-components";

const Loader = props => (
  <LoaderContainer>
    <StyledLoader />
    Loading...
  </LoaderContainer>
);

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const StyledLoader = styled.div`
  border: 7px solid #dddddd;
  border-radius: 50%;
  border-top: 7px solid #2cbeff;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
