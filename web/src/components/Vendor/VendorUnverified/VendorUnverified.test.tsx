import { render } from "@redwoodjs/testing/web";

import VendorUnverified from "./VendorUnverified";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("VendorUnverified", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<VendorUnverified />);
    }).not.toThrow();
  });
});
