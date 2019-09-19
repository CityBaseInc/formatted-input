import React from "../node_modules/react";
import ReactDOM from "../node_modules/react-dom";
import ExampleForm from "./ExampleForm";
import ReduxFreeform from "./ReduxFreeformExample";
import ReduxFreeformExample from "./ReduxFreeformExample";

const exampleForm = document.getElementById("example-form");
ReactDOM.render(
  <ExampleForm />,
  exampleForm
);

const reduxFreeform = document.getElementById("redux-freeform");
ReactDOM.render(
    <ReduxFreeformExample />,
    reduxFreeform
);