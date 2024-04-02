import 'isomorphic-fetch';
import 'babel-polyfill';
import React from 'react';
import { hot } from 'react-hot-loader';
import {Route} from 'react-router-dom'

import Hello from './components/Hello';
import HomePage from './pages/HomePage';
import SubPage from './pages/SubPage';

const Root = () => (
  <div>
    <h1>Server Side Renderig</h1>
    <Hello name="World" />
    <Route path='/' exact component={HomePage}></Route>
    <Route path='/sub' exact component={SubPage}></Route>
  </div>
);

export default hot(module)(Root);

