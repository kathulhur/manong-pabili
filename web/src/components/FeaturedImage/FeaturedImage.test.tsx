import { render } from "@redwoodjs/testing/web";

import FeaturedImage from "./FeaturedImage";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("FeaturedImage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FeaturedImage />);
    }).not.toThrow();
  });
});
