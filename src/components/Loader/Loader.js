import React from "react";
import { Loader as SemanticLoader, Dimmer } from "semantic-ui-react";

const Loader = props => (
  <Dimmer inverted active page>
    <SemanticLoader {...props}>Loading</SemanticLoader>
  </Dimmer>
);

export default Loader;
