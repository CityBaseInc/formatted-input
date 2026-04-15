import test from "ava";
import React, { useState } from "react";
import { shallow, mount } from "enzyme";
import { FormattedInput, createFormat } from "../src";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { dateFormats, moneyFormats, phoneFormats } from "./utils";

Enzyme.configure({ adapter: new Adapter() });

const TestForm = ({formats, char}) => {
  const [val, setVal] = useState("");
  const props = {
    value: val,
    formatter: createFormat(formats, char),
    onChange: v => setVal(val + v) // this has to be different from the examples due to how enzyme simulates user input
  }
  return (
    <form>
      <FormattedInput {...props} />
    </form>
  );
};

const NoOnChangeForm = ({formats, char}) => {
  const [val] = useState("");
  const props = {
    value: val,
    formatter: createFormat(formats, char)
  }
  return (
    <form>
      <FormattedInput {...props} />
    </form>
  );
};

const KeyFilteredTestForm = ({ formats, char }) => {
  const [val, setVal] = useState("123");
  const props = {
    value: val,
    formatter: createFormat(formats, char),
    onChange: v => setVal(v),
    onKeyDown: e => { if (e.key === ".") e.preventDefault(); }
  };
  return (
    <form>
      <FormattedInput {...props} />
    </form>
  );
};

const ConstrainedTestForm = ({formats, char}) => {
  const [val, setVal] = useState("");
  const props = {
    value: val,
    formatter: createFormat(formats, char),
    onChange: v => {
      if (val.length < 11) {
        setVal(val + v)
      } else {
        setVal(val)
      }
    }
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

test("works as a controlled component, input does not control value", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let input = form.find("input").first();
  input.simulate("keydown", {key: "1"});
  input = form.find("input").first();
  t.is(input.props().value, "");
});

test("no onChange provided", t => {
  let form = mount(<NoOnChangeForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  formattedInput.simulate("change", {target: {value: "1"}});
  let input = form.find("input").first();
  t.is(input.props().value, "");
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
  formattedInput.simulate("change");
  formattedInput.simulate("change", {target: {value: "34"}});
  input = form.find("input").first();
  t.is(input.props().value, "+1 (234) ");
});

test("handles complex reformatting on user input", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  formattedInput.simulate("change", {target: {value: "12345678900"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+1 (234) 567 - 8900");
  formattedInput.simulate("change");
  formattedInput.simulate("change", {target: {value: "00"}});
  input = form.find("input").first();
  t.is(input.props().value, "+123 (456) 789 - 0000");
});

test("unformats beyond formatter without constraints", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  t.is(formattedInput.find("input").length, 1);
  formattedInput.simulate("change", {target: {value: "1234567890000"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+123 (456) 789 - 0000");
  formattedInput.simulate("change");
  formattedInput.simulate("change", {target: {value: "00"}});
  input = form.find("input").first();
  t.is(input.props().value, "123456789000000");
});

test("constrained under format", t => {
  let form = mount(<ConstrainedTestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  formattedInput.simulate("change", {target: {value: "12345678900"}});
  let input = form.find("input").first();
  t.is(input.props().value, "+1 (234) 567 - 8900");
  formattedInput.simulate("change", {target: {value: "00"}});
  input = form.find("input").first();
  t.is(input.props().value, "+1 (234) 567 - 8900");
});

test("calls user-provided onKeyDown", t => {
  let called = false;
  const props = {
    value: "123",
    formatter: createFormat(moneyFormats, "_"),
    onChange: () => {},
    onKeyDown: () => { called = true; }
  };
  let wrapper = mount(<FormattedInput {...props} />);
  let input = wrapper.find("input").first();
  input.simulate("keydown", { key: "1", target: { selectionStart: 0, selectionEnd: 0 } });
  t.true(called);
});

test("onKeyDown preventDefault stops stateRefs update and value is unchanged", t => {
  // Start with value "123" which displays as "$1.23" in money format.
  // Pressing "." with preventDefault should leave the value at "$1.23".
  let form = mount(<KeyFilteredTestForm formats={moneyFormats} char={"_"} />);
  let input = form.find("input").first();
  t.is(input.props().value, "$1.23");

  // Simulate keydown for ".". The component's onKeyDown calls preventDefault,
  // so stateRefs should NOT be updated and the value should stay unchanged.
  input.simulate("keydown", { key: ".", target: { selectionStart: 5, selectionEnd: 5 } });

  // In a real browser, preventDefault() stops onChange from firing.
  // Verify value is still "$1.23".
  input = form.find("input").first();
  t.is(input.props().value, "$1.23");
});

test("pressing decimal repeatedly does not corrupt money format value", t => {
  // Regression test: previously, each decimal press would corrupt the internal
  // formattedValue state, causing subsequent decimal presses to delete digits.
  let form = mount(<KeyFilteredTestForm formats={moneyFormats} char={"_"} />);
  let input = form.find("input").first();
  t.is(input.props().value, "$1.23");

  // Simulate pressing "." three times; value must remain unchanged each time.
  for (let i = 0; i < 3; i++) {
    const keyEvent = {
      key: ".",
      defaultPrevented: false,
      preventDefault() { this.defaultPrevented = true; },
      target: { selectionStart: 5, selectionEnd: 5 }
    };
    input.simulate("keydown", keyEvent);
    input = form.find("input").first();
    t.is(input.props().value, "$1.23", `value corrupted after ${i + 1} decimal press(es)`);
  }
});

test("cursor position", t => {
  let form = mount(<TestForm formats={phoneFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  let input = form.find("input").first();
  input.instance().focus();
  t.is(input.instance().selectionStart, 0);
  t.is(input.instance().selectionEnd, 0);
  formattedInput.simulate("change", {target: {value: "12345678900"}});
  input.instance().focus();
  input = form.find("input").first();
  t.is(input.instance().selectionStart, 19);
  t.is(input.instance().selectionEnd, 19);
});