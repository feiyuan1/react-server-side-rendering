  // js 文件中的url，依赖于 ./
import React from "react";
import Root from "../Root";
import {renderToString} from 'react-dom/server'

function renderHTML() {
  const content = renderToString(<Root />)
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <!--这是代码字符串中的 url，依赖于 dist 路径-->
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

export default function (req, res) {
  res.send(renderHTML());
};
