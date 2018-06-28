import React from 'react';
import ReactDOM from 'react-dom';
import undefined from './undefined';
 
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<undefined />, div);
  ReactDOM.unmountComponentAtNode(div);
});