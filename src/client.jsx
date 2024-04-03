import React, {useLayoutEffect} from 'react';
import { hydrate } from 'react-dom';
import Root from './Root';
import { StoreProvider, createStore } from './storeContext';
import { BrowserRouter } from 'react-router-dom';

const root = (
  <StoreProvider value={createStore(window.initialState)}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StoreProvider>
);

const RootNode = () => {
  useLayoutEffect(() => {
    const styles = document.getElementsByTagName('style')
    for(let i = 0; i < styles.length; i++){
      const styleElem = styles[i]
      if(styleElem.dataset.hasOwnProperty('ssr')){
        styleElem.remove()
      }
    }
  })
  return root
}

hydrate(<RootNode />, document.getElementById('root'));
