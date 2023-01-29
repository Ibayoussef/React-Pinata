const axios = require("axios");
const { render, fireEvent, waitFor } = require("@testing-library/react");
const { JSDOM } = require("jsdom");
const React = require("react");
const axiosMock = jest.spyOn(axios, "post");

describe("Pianata", () => {
  beforeEach(() => {
    axiosMock.mockReset();
  });

  it("should render", async () => {
    // render the component
    return "working";
  });
});
