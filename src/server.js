import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from './components/App';
const app = express();

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  // This is the stats file generated by webpack loadable plugin
  const statsFile = path.resolve('./dist/loadable-stats.json');
  const publicPath = '/dist';
  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({
    publicPath,
    statsFile
  });

  // Wrap your application using "collectChunks"
  const jsx = extractor.collectChunks(<App />) // eslint-disable-line

  // Render your application
  const body = renderToString(
    <Provider store={configureStore()}>
      <StaticRouter location={req.url} context={{}}>
        {jsx}
      </StaticRouter>
    </Provider>
  );

  // You can now collect your script tags
  const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();
  // You can also collect your "preload/prefetch" links
  const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  const styleTags = extractor.getStyleTags() // or extractor.getStyleElements();

  const html = `
<html>
  <head>
    ${linkTags}
    <!---->
    ${styleTags}
    <!---->
    ${scriptTags}
  </head>
  <body>
    <div id="app">${body}</div>
  </body>
</html>
`;

  res
    .status(200)
    .send(html);
});


// eslint-disable-next-line no-console
app.listen(9000, () => console.log('Server started http://localhost:9000'));
