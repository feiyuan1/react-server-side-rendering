  // js 文件中的url，依赖于 ./
import React from "react";
import Root from "../Root";
import {renderToString} from 'react-dom/server'
import { StoreProvider, createStore } from "../storeContext";
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import path from 'path'
import fs from 'fs'

const promises = []

const parse = async (node, store) => {
  // 这里可以拿到路由信息吗？
  const {type: Fun, props: {children}, props} = node

  if(typeof Fun === 'function'){
    if(typeof Fun.fetchData === 'function'){
      promises.push(Fun.fetchData(store))
    }

    const element = Fun(props)
    await parse(element, store)
  }

  if(children && Array.isArray(children) && children.length){
    children.forEach(async node => {
      await parse(node, store)
    });
  }
}

async function renderHTML() {
  const store = createStore()
  await parse(<Root />, store)
  await Promise.all(promises)

  const filePath = path.resolve('./public', 'index.html')
  // const css = new Set() // CSS for all rendered React components
  // const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const content = renderToString( 
    // <StyleContext.Provider value={{ insertCss }}>
    <StoreProvider value={store}>
      <Root />
    </StoreProvider>
    // </StyleContext.Provider>
  )
  console.log('content: ', content)
  const storeScript = `<script>window.initialState = ${JSON.stringify(store)}</script>`

  // 先构建 client 再构建 server，不适用本地开发
  const htmlContent = fs.readFileSync(filePath, 'utf8')

  return htmlContent.replace('<div id="root"></div>',`<div id="root">${content}</div>${storeScript}`)
}

export default async function (req, res) {
  console.log('serverRender')
  const html = await renderHTML()
  res.send(html)
};
