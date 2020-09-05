import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("Should render three NavItem if  authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("Should render two NavItem if not authenticated", () => {
    wrapper.setProps({ authenticated: true }); //authenticated true means here... actually not authenticated XD
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
