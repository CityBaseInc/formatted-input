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

const MoneyTestForm = ({ formats, char }) => {
  const [val, setVal] = useState("123");
  const props = {
    value: val,
    formatter: createFormat(formats, char),
    // Mimic a digits-only constraint (e.g. onlyNaturals in redux-freeform)
    onChange: v => { if (/^\d*$/.test(v)) setVal(v); }
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

test("non-digit input rejected by onChange does not corrupt subsequent keypresses", t => {
  // Regression: previously, when onChange rejected a non-digit (e.g. "."),
  // the internal formattedValue state diverged from the displayed value,
  // causing subsequent keypresses to silently delete digits.
  let form = mount(<MoneyTestForm formats={moneyFormats} char={"_"} />);
  let formattedInput = form.find("FormattedInput").at(0);
  let input = form.find("input").first();
  t.is(input.props().value, "$1.23");

  // Simulate keydown (captures stateRefs) then change (browser injects ".").
  // onChange rejects "123." — value stays "123" → "$1.23".
  input.simulate("keydown", { key: ".", target: { selectionStart: 5, selectionEnd: 5 } });
  formattedInput.simulate("change", { target: { value: "$1.23." } });
  input = form.find("input").first();
  t.is(input.props().value, "$1.23");

  // A subsequent digit must still work correctly — no corruption.
  input.simulate("keydown", { key: "4", target: { selectionStart: 5, selectionEnd: 5 } });
  formattedInput.simulate("change", { target: { value: "$12.34" } });
  input = form.find("input").first();
  t.is(input.props().value, "$12.34");
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