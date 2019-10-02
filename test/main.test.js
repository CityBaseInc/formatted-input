import test, { beforeEach } from "ava";
import {shallow} from "enzyme";
import { FormattedInput, createFormat } from '../src/FormattedInput';

describe("<FormattedInput />"), () => {
  let wrapper;
  let props;

  beforeEach(() => {
     wrapper = shallow(<FormattedInput {...props} />)
  });

  it("renders the FormattedInput component"), () => {
    wrapper.find("input").length.toBe(1);
  }
}