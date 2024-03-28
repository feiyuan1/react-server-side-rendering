import React from 'react';
import { hydrate } from 'react-dom';
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import Root from './Root';

// const insertCss = (...styles) => {
//   const removeCss = styles.map(style => style._insertCss())
//   return () => removeCss.forEach(dispose => dispose())
// }

const root = (
  // <StyleContext.Provider value={{ insertCss }}>
    <Root />
  // </StyleContext.Provider>
);

hydrate(root, document.getElementById('root'));
