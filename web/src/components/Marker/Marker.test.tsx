import { render } from "@redwoodjs/testing/web";

import Marker from "./Marker";

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe("Marker", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<Marker />);
    }).not.toThrow();
  });
});
