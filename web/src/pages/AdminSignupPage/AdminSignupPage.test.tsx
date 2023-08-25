import { render } from "@redwoodjs/testing/web";

import AdminSignupPage from "./AdminSignupPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("AdminSignupPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<AdminSignupPage />);
    }).not.toThrow();
  });
});
