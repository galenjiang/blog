const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const app = new Koa();

const readFile = fileName => new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });

app.use(serve(path.resolve(__dirname, 'public')));

app.use(async (ctx, next) => {
  if(ctx.request.path === '/') {
    ctx.body = await readFile('./views/index.html')
  }
});

module.exports = app;