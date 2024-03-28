  // js 文件中的url，依赖于 ./
import React from "react";
import Root from "../Root";
import {renderToString} from 'react-dom/server'
import StyleContext from 'isomorphic-style-loader/StyleContext'
import path from 'path'
import fs from 'fs'

function renderHTML() {
  const filePath = path.resolve('./public', 'index.html')
  // const css = new Set() // CSS for all rendered React components
  // const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const content = renderToString( 
    // <StyleContext.Provider value={{ insertCss }}>
      <Root />
    // </StyleContext.Provider>
  )
  console.log('content: ', content)

  // 先构建 client 再构建 server，不适用本地开发
  const htmlContent = fs.readFileSync(filePath, 'utf8')

  return htmlContent.replace('<div id="root"></div>',`<div id="root">${content}</div>`)
}

export default function (req, res) {
  console.log('comein')
  res.send(renderHTML())
};
