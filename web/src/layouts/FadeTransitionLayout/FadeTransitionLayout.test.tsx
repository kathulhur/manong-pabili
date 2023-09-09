import { render } from "@redwoodjs/testing/web";

import FadeTransitionLayout from "./FadeTransitionLayout";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("FadeTransitionLayout", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FadeTransitionLayout />);
    }).not.toThrow();
  });
});
