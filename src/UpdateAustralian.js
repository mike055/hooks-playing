import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { SampleStoreContext } from "./index";
import "./styles.css";

function UpdateAustralian() {
  const store = useContext(SampleStoreContext);
  return (
    <div className="australian">
      <h2>Is Australian?</h2>
      <button
        onClick={() => {
          store.dispatch({
            type: "set-data-value",
            name: "isAustralian",
            value: true
          });
        }}
      >
        Set as true
      </button>
      <button
        onClick={() =>
          store.dispatch({
            type: "set-data-value",
            name: "isAustralian",
            value: false
          })
        }
      >
        Set as false
      </button>
    </div>
  );
}

export default UpdateAustralian;
