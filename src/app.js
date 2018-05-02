const Koa = require('koa');
const Router = require('koa-router');
const Sequelize = require('sequelize');
const Book = require('./book');

const app = new Koa();
const router = new Router();
const book = new Book();

const sequelize = new Sequelize("library", "root", "", {
  host: process.env.NODE_ENV === "development" ? "mysql" : "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 5
  }
});

app.context.sequelize = sequelize;

app.use(async (ctx, next) => {
    const { sequelize } = ctx;
    const Book = sequelize.define('books', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING
        }
    });
    sequelize.models.Book = Book;
    await next();
})

router.post('/register', async (ctx, next) => {
  const b = await book.register(ctx);
  ctx.b = b;
  await next();
},
async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.b;
});

app.use(router.routes());

app.listen(3010);