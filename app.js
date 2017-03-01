const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');

app.use(serve(path.resolve(__dirname, '../public')));

app.use(ctx => {
  if(ctx.request.path === '/') {
    fs.readFile('./views/index.html', (err, data) => {
      ctx.body = data;
    })
  }
});

module.exports = app;