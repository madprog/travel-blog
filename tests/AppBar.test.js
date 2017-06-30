import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import _AppBar from 'AppBar';

const setup = (props={}) => {
  const context = {
    muiTheme: getMuiTheme(),
  };

  const enzymeWrapper = shallow(<_AppBar {...props} />, context);

  return {
    context,
    enzymeWrapper,
    props,
  };
};

describe('Components', () => {
  describe('AppBar', () => {
    xit('should render self and subcomponents', () => {
      const { context, enzymeWrapper } = setup();

      console.log(enzymeWrapper.debug());
      const appBars = enzymeWrapper.find(AppBar);
      expect(appBars.length).toBe(1);

      const appBarProps = appBars.at(0).props();
      expect(appBarProps.title).toEqual('Accueil');

      const leftElement = appBarProps.iconElementLeft;
      expect(leftElement).toBeDefined();

      const leftButtons = new ShallowWrapper(leftElement, { context }).find('IconButton');
      expect(leftButtons.length).toBe(2);

      const firstLeftButton = leftButtons.at(0);
      expect(firstLeftButton).toBeDefined();
      expect(firstLeftButton.childAt(0).length).toBe(1);
      expect(firstLeftButton.childAt(0).name()).toBe('NavigationMenu');

      const secondLeftButton = leftButtons.at(1);
      expect(secondLeftButton).toBeDefined();
      expect(secondLeftButton.childAt(0).length).toBe(1);
      expect(secondLeftButton.childAt(0).name()).toBe('NavigationChevronLeft');

      const rightElement = appBarProps.iconElementRight;
      expect(rightElement).toBeDefined();

      const rightButton = new ShallowWrapper(rightElement, { context });
      expect(rightButton).toBeDefined();
      expect(rightButton.name()).toBe('IconButton');
      expect(rightButton.childAt(0).length).toBe(1);
      expect(rightButton.childAt(0).name()).toBe('NavigationChevronRight');
    });
  });
});
