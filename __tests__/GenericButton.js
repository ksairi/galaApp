import React from "react";
import renderer from "react-test-renderer";
import Button from "components/presentationals/GenericButton";

it("renders Generic without crashing", () => {
  const rendered = renderer.create(<Button />).toJSON();
  expect(rendered).toBeTruthy();
});
