import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultLanguage } from '@core/entities/constants/default-language.const';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use('/**', async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);

    if (!response) {
      return next();
    }

    let html = await response.text();
    html = html.replace('<html', `<html lang="${defaultLanguage}"`);

    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(html);
  } catch (error) {
    next(error);
  }
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
