import test from "ava";
import React, { JSX, useState } from "react";
import { shallow, mount } from "enzyme";
import FormattedInput, { createFormat } from "../src/FormattedInput";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { dateFormats, phoneFormats } from "./utils";

test("can use ava", t => {
    t.pass();
});

Enzyme.configure({ adapter: new Adapter() });

const TestForm = ({formats, char}) => {
  const [val, setVal] = useState("");
  const props = {
    value: val,
    formatter: createFormat(formats, char),
    onChange: v => setVal(val + v)
  }
  return (
    <form>
      <FormattedInput {...props} />
    </form>
  );
};


test("renders an input element under the hood", t => {
  const props = {
    value: "test",
    formatter: createFormat(phoneFormats, "_"),
    onChange: v => {}
  }
  let wrapper = shallow(<FormattedInput {...props} />);
  t.is(wrapper.find("input").length, 1);
});

test("works as a controlled component", t => {
  let form = shallow(<TestForm formats={phoneFormats} char={"_"} />);
  t.is(form.children().length, 1);
});

test("formats a date correctly", t => {
  const props = {
    value: "10041993",
    formatter: createFormat(dateFormats, "x"),
    onChange: v => {}
  };
  let wrapper = shallow(<FormattedInput {...props} />);
  let input = wrapper.find("input").at(0);
  t.is(input.props().value, "10/04/1993");
})

test("formats a basic phone number correctly", t => {
  const props = {
    value: "12345678900",
    formatter: createFormat(phoneFormats, "_"),
    onChange: v => {}
  }
  let wrapper = shallow(<FormattedInput {...props} />);
  let input = wrapper.find("input").at(0);
  t.is(input.props().value, "+1 (234) 567 - 8900");
});

test("handles reformatting on user input", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  t.is(formattedInput.find("input").length, 1);
  formattedInput.simulate("change", {target: {value: "1"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+1");
});

test("handles multiple reformatting on user input", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  t.is(formattedInput.find("input").length, 1);
  formattedInput.simulate("change", {target: {value: "12"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+1 2");
  formattedInput.simulate("change", {target: {value: "34"}});
  input = form.find("input").first();
  t.is(input.props().value, "+1 (234) ");
});

test("handles complex reformatting on user input", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  t.is(formattedInput.find("input").length, 1);
  formattedInput.simulate("change", {target: {value: "12345678900"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+1 (234) 567 - 8900");
  formattedInput.simulate("change", {target: {value: "00"}});
  input = form.find("input").first();
  t.is(input.props().value, "+123 (456) 789 - 0000");
});