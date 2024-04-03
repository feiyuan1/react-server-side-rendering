import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {useStoreContext} from '../../storeContext'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import styles from './hello.css'

const Hello = ({ name }) => {
  const store = useStoreContext()
  const style = useContext(StyleContext)
  if(typeof window === 'undefined'){
    style.css.add(styles._getCss())
  }

  useEffect(() => {
    if(store.data) {
      console.log('ok.')
    }
  }, [])

  return (
  <div className={styles.bg}>Hello <b>{name}</b> {store.data}</div>
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

