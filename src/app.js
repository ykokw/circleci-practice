const Koa = require('koa');
const Router = require('koa-router');
const Sequelize = require('sequelize');
const Book = require('./book');

const app = new Koa();
const router = new Router();
const book = new Book();

const sequelize = new Sequelize("library", "root", "", {
  // host: "mysql",
  host: "127.0.0.1",
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

// router.get('/relay', async (ctx, next) => {
router.post('/register', async (ctx, next) => {
  const b = await book.register(ctx);
  ctx.b = b;
  await next();
},
async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.b;
});

async function relay() {
  return await timeout(5000);
}

async function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("random");
    }, delay);
  });
};

app.use(router.routes());

app.listen(3001);