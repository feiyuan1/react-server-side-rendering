  // js 文件中的url，依赖于 ./
import React from "react";
import Root from "../Root";
import {renderToString} from 'react-dom/server'
import { StaticRouter } from "react-router-dom";
import { StoreProvider, createStore } from "../storeContext";
import StyleContext from 'isomorphic-style-loader/StyleContext'
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

const joinSet = set => {
  let result = ''
  set.forEach(item => result += item)
  return result
}

const insertCss = (html, css) => html.replace('<head>', `<style data-ssr>${css}</style>`)
const insertContent = (html, content) => html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
const insertScript = (html, script) => html.replace('<script', `${script}<script`)

async function renderHTML(location) {
  const store = createStore()
  await parse(<Root />, store)
  await Promise.all(promises)

  const filePath = path.resolve('./public', 'index.html')
  const css = new Set() // CSS for all rendered React components
  const content = renderToString( 
    <StyleContext.Provider value={{ css }}>
      <StoreProvider value={store}>
        <StaticRouter location={location}>
          <Root />
        </StaticRouter>
      </StoreProvider>
    </StyleContext.Provider>
  )
  console.log('content: ', content)
  const storeScript = `<script>window.initialState = ${JSON.stringify(store)}</script>`

  // 先构建 client 再构建 server，不适用本地开发
  const htmlContent = fs.readFileSync(filePath, 'utf8')
  const contents = [joinSet(css), content, storeScript]

  return [insertCss, insertContent, insertScript].reduce((html, fun, i) => {
    return fun(html, contents[i])
  }, htmlContent)
}

export default async function (req, res) {
  console.log('serverRender')
  const html = await renderHTML(req.originalUrl)
  res.send(html)
};
