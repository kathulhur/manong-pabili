import { render } from "@redwoodjs/testing/web";

import VerifiedVendorLayout from "./VerifiedVendorLayout";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("VerifiedVendorLayout", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<VerifiedVendorLayout />);
    }).not.toThrow();
  });
});
