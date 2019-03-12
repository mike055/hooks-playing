import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";

import App from "./index";
import * as fetchSvc from "./fetchData";

describe("Index with react-testing-library", () => {
  let fakePayload = { data: "12345" };
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    console.log("1");
  });

  afterEach(() => {
    sandbox.restore();
    console.log("2");
  });

  describe("when the api hasnt returned", () => {
    beforeEach(() => {});

    it("shows loading while waiting", () => {
      console.log("enzyme test 1");
      const renderedApp = mount(<App />);

      const loadingContainer = renderedApp.find(".loading");
      const theForm = renderedApp.find(".the-form");
      const theError = renderedApp.find(".the-error");

      expect(loadingContainer.exists()).toBe(true);
      expect(theForm.exists()).toBe(false);
      expect(theError.exists()).toBe(false);
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
        console.log("enzyme test 2");

        const renderedApp = mount(<App />);

        return Promise.resolve().then(() => {
          console.log("in the wait");
          renderedApp.update();
          const loadingContainer = renderedApp.find(".loading");
          const theForm = renderedApp.find(".the-form");
          const theError = renderedApp.find(".the-error");

          expect(loadingContainer.exists()).toBe(false);
          expect(theForm.exists()).toBe(true);
          expect(theError.exists()).toBe(false);
        });
      });
    });

    describe.only("with an error", () => {
      let renderedApp;
      beforeEach(() => {
        console.log("before enzyme test 3");
        sandbox.stub(fetchSvc, "fetchData").returns(Promise.reject());
        renderedApp = mount(<App />);
      });

      it("shows error after the api returns an error", () => {
        console.log("enzyme test 3");

        return fetchSvc.fetchData().catch(() => {
          console.log("when do i get here?");
          renderedApp.update();

          const loadingContainer = renderedApp.find(".loading");
          const theForm = renderedApp.find(".the-form");
          const theError = renderedApp.find(".the-error");

          expect(loadingContainer.exists()).toBe(false);
          expect(theForm.exists()).toBe(false);
          expect(theError.exists()).toBe(true);
        });

        //});
      });
    });
  });
});
