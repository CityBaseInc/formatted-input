import test from "ava";
import React, { JSX } from "react";
import { shallow } from "enzyme";
import { FormattedInput, createFormat } from "../src/FormattedInput";

test("can use ava", t => {
    t.pass();
});

Enzyme.configure({ adapter: new Adapter() })
let wrapper = shallow(<FormattedInput />);

test("renders an input element under the hood", t => {
  t.is(wrapper.children().length, 1);
  t.is(wrapper.find("input").length, 1);
});

it("formats a date correctly", () => {

});
