import React from "react";
import ReactDOM from "react-dom";
import ExampleForm from "./ExampleForm";
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