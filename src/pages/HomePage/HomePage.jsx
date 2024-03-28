import React from 'react';
import Hello from '../../components/Hello';
import loginCut from './loginCut.png'

const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <Hello name="you are on Home Page" />
    <img src={loginCut}/>
    <button onClick={()=>{console.log('111')}}>click</button>
  </div>
);

export default HomePage;
