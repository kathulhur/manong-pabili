import { render } from "@redwoodjs/testing/web";

import VendorAccountPage from "./VendorAccountPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("VendorAccountPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<VendorAccountPage />);
    }).not.toThrow();
  });
});
