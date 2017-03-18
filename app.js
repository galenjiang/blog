const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const Router = require('koa-router');

const route = require('./router');
const api = require('./router/api');
const error = require('./router/404');

const app = new Koa();


app.use(views(__dirname + '/views'));
app.use(serve(path.resolve(__dirname, 'public')));

const indexRoute = new Router();
indexRoute.use('/', route.routes(), route.allowedMethods())
app.use(indexRoute.routes());

const apiRoute = new Router();
apiRoute.use('/api', api.routes(), api.allowedMethods())
app.use(apiRoute.routes());

const errRoute = new Router();
errRoute.use('/*', error.routes(), error.allowedMethods())
app.use(errRoute.routes());

module.exports = app;
