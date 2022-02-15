import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import App from './App';
import React from 'react';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';

import reducers from './reducers';

const store = createStore(
  reducers
)

test('test header', () => {
  render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
  const linkElement = screen.getByText(/tetris/i);
  expect(linkElement).toBeInTheDocument();
});
