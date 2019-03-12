import React, { useContext } from "react";
import ReactDOM from "react-dom";

import { SampleStoreContext } from "./index";
import "./styles.css";

function StoreDisplay() {
  const store = useContext(SampleStoreContext);
  return (
    <div className="store-display">
      <h2>Whats in the store?</h2>
      <pre className="state-display">
        {JSON.stringify(store.state, null, 2)}
      </pre>
    </div>
  );
}

export default StoreDisplay;
