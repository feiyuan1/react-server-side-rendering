import React from 'react';
import Hello from '../../components/Hello';

const HomePage = () => (
  <div>
    <h2>Home Page</h2>
    <Hello name="you are on Home Page" />
    <button onClick={()=>{console.log('111')}}>click</button>
  </div>
);

export default HomePage;
