import { render } from "@redwoodjs/testing/web";

import UserProductsPage from "./UserProductsPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("UserProductsPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<UserProductsPage />);
    }).not.toThrow();
  });
});
