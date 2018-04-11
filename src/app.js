const Koa = require('koa');
const logger = require('koa-logger');
const route = require('koa-route');
const Book = require('./book');

const app = new Koa();
const book = new Book();

// logger
app.use(logger());

// router
app.use(route.get('/list', book.getList))
app.use(route.post('/register', book.register))

app.listen(3010);