import { render } from "@redwoodjs/testing/web";

import DashboardProduct from "./DashboardProduct";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("DashboardProduct", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<DashboardProduct />);
    }).not.toThrow();
  });
});
