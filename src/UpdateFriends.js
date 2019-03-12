import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import { SampleStoreContext } from "./index";
import "./styles.css";

function UpdateFriends() {
  const store = useContext(SampleStoreContext);
  const value = store.state.data.numberOfFriends || "";
  const [formValue, setFormValue] = useState(value);

  return (
    <div className="friends">
      <h2>Number of friends</h2>
      <input
        type="tel"
        value={formValue}
        onChange={e => {
          setFormValue(e.target.value);
        }}
        onBlur={() => {
          store.dispatch({
            type: "set-data-value",
            name: "numberOfFriends",
            value: Number.parseInt(formValue)
          });
        }}
      />
    </div>
  );
}

export default UpdateFriends;
