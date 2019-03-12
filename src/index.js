import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { fetchData } from "./fetchData";
import StoreDisplay from "./StoreDisplay";
import UpdateAustralian from "./UpdateAustralian";
import UpdateFriends from "./UpdateFriends";

import "./styles.css";

export const SampleStoreContext = React.createContext();

const initialState = {};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "init": {
      return action.payload;
    }
    case "set-data-value":
      return {
        ...state,
        data: {
          ...state.data,
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [apiState, setApiState] = useState({ isLoading: true, isError: false });

  useEffect(() => {
    console.log("useEffect", fetchData);
    fetchData()
      .then(json => {
        console.log("fetch 1: ", json);
        return json;
      })
      .then(json => {
        console.log("fetch 2: ");
        dispatch({ type: "init", payload: json });
      })
      .then(() => {
        console.log("fetch 3: ");
        //setIsLoading(false);
        setApiState({ isLoading: false, isError: false });
      })
      .catch(err => {
        console.log("error", err);
        //two setStates inside an effect does not cause two renders :(
        //setIsLoading(false);
        //setIsError(true);
        setApiState({ isLoading: false, isError: true });
      });
  }, []);

  console.log("render", state, apiState, fetchData);
  return (
    <SampleStoreContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1>Context and Reducer</h1>
        {apiState.isLoading && <div className="loading">Loading</div>}
        {apiState.isError && <div className="the-error"> Error</div>}
        {!apiState.isError && !apiState.isLoading && (
          <div className="the-form">
            <UpdateAustralian />
            <UpdateFriends />
            <StoreDisplay />
          </div>
        )}
      </div>
    </SampleStoreContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
