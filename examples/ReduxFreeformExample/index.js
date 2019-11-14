import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import ReduxFreeformExample from "./ReduxFreeformExample";
import {
  mapStateToProps,
  reducer,
  mapDispatchToProps
} from "./reduxFreeformExample.state";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const reduxFreeform = document.getElementById("redux-freeform");
const render = () => {
  ReactDOM.render(
    <ReduxFreeformExample
      {...mapStateToProps(store.getState())}
      {...mapDispatchToProps(store.dispatch)}
    />,
    reduxFreeform
  );
};

render();
store.subscribe(render);