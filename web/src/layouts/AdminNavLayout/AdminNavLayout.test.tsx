import { render } from "@redwoodjs/testing/web";

import AdminNavLayout from "./AdminNavLayout";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("AdminNavLayout", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<AdminNavLayout />);
    }).not.toThrow();
  });
});
