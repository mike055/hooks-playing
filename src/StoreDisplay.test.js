import React from "react";
import { render, cleanup } from "react-testing-library";

import StoreDisplay from "./StoreDisplay";
import { SampleStoreContext } from "./index";

describe("StoreDisplay", () => {
  const mockState = {
    foo: "bar"
  };

  let renderedComponent;

  beforeEach(() => {
    renderedComponent = render(
      <SampleStoreContext.Provider value={{ state: mockState }}>
        <StoreDisplay />
      </SampleStoreContext.Provider>
    );
  });

  afterEach(cleanup);

  it("displays value from state", () => {
    const { container } = renderedComponent;

    const storeDisplay = container.querySelector(".state-display");

    expect(storeDisplay.innerText === JSON.stringify(mockState, null, 2)).toBe(
      true
    );
  });
});
