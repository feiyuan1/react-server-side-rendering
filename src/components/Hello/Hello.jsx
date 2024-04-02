import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {useStoreContext} from '../../storeContext'
// import useStyles from 'isomorphic-style-loader/useStyles'
import './hello.css'

const Hello = ({ name }) => {
  const store = useStoreContext()

  useEffect(() => {
    if(store.data) {
      console.log('ok.')
    }
  }, [])

  return (
  <div className="bg">Hello <b>{name}</b> {store.data}</div>
)};

Hello.propTypes = {
  name: PropTypes.string.isRequired,
};

Hello.fetchData = async(store) => {
  const result = await fetch('http://localhost:8000/api/init/data')
  const data = await result.text()
  store.update({data})
}

export default Hello;

