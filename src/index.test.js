import React from "react";
import { render, cleanup, waitForElement, wait } from "react-testing-library";
import sinon from "sinon";

import App from "./index";
import * as fetchSvc from "./fetchData";

describe("Index with react-testing-library", () => {
  let fakePayload = { data: "12345" };
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    cleanup();
    sandbox.restore();
  });

  describe("when the api hasnt returned", () => {
    beforeEach(() => {});

    it("shows loading while waiting", () => {
      console.log("test 1");
      const { container } = render(<App />);

      const loadingContainer = container.querySelector(".loading");
      const theForm = container.querySelector(".the-form");
      const theError = container.querySelector(".the-error");

      expect(loadingContainer).not.toBeNull();
      expect(theForm).toBeNull();
      expect(theError).toBeNull();
    });
  });

  describe("when the api return", () => {
    describe("with a payload", () => {
      beforeEach(() => {
        sandbox
          .stub(fetchSvc, "fetchData")
          .returns(Promise.resolve(fakePayload));
      });

      it("shows the form after the api returns", () => {
        console.log("test 2");

        const { container } = render(<App />);

        return wait().then(() => {
          console.log("in the wait");
          const loadingContainer = container.querySelector(".loading");
          const theForm = container.querySelector(".the-form");
          const theError = container.querySelector(".the-error");

          expect(loadingContainer).toBeNull();
          expect(theForm).not.toBeNull();
          expect(theError).toBeNull();
        });
      });
    });

    describe("with a payload", () => {
      beforeEach(() => {
        sandbox.stub(fetchSvc, "fetchData").returns(Promise.reject());
      });

      it("shows error after the api returns an error", () => {
        console.log("test 3");

        const { container } = render(<App />);

        return wait().then(() => {
          console.log("in the wait", container);
          const loadingContainer = container.querySelector(".loading");
          const theForm = container.querySelector(".the-form");
          const theError = container.querySelector(".the-error");

          expect(loadingContainer).toBeNull();
          expect(theForm).toBeNull();
          expect(theError).not.toBeNull();
        });
      });
    });
  });
});
