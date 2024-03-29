import React, { createContext, useContext, useState } from "react"

const StoreContext = createContext([])

export const StoreProvider = ({value, children}) => {
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStoreContext = () => {
  return useContext(StoreContext)
}

export const createStore = (init) => {
  return Object.assign(init || {}, {
    update(newStore){
      for(const prop in newStore){
        this[prop] = newStore[prop]
      }
    }
  })

}

export default StoreContext