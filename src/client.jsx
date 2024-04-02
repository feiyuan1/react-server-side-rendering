import React from 'react';
import { hydrate } from 'react-dom';
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import Root from './Root';
import { StoreProvider, createStore } from './storeContext';
import { BrowserRouter } from 'react-router-dom';

// const insertCss = (...styles) => {
//   const removeCss = styles.map(style => style._insertCss())
//   return () => removeCss.forEach(dispose => dispose())
// }

const root = (
  // <StyleContext.Provider value={{ insertCss }}>
  <StoreProvider value={createStore(window.initialState)}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StoreProvider>
  // </StyleContext.Provider>
);

hydrate(root, document.getElementById('root'));
