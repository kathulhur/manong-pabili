import { render } from "@redwoodjs/testing/web";

import UserImagesPage from "./UserImagesPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("UserImagesPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<UserImagesPage />);
    }).not.toThrow();
  });
});
