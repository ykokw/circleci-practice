class Book {
    // async getList (ctx, next) {
    //     const { sequelize } = ctx;
    //     const { Book } = sequelize.models;
    //     const books = await Book.findAll({
    //     }).catch(err => {
    //         console.log(err);
    //         ctx.body = err.toString()
    //     });
    //     ctx.body = books.map(b => b.toJSON());
    //     await next();
    // }
    async register (ctx) {
        // ctx.body = 'register';
        const { sequelize } = ctx;
        const { Book } = sequelize.models;
        const book = await Book.create({
          title: 'test'
        }).catch(err => {
            console.log(`err: ${err}`);
            ctx.body = err.toString()
        });
        return book;
    }
}

module.exports = Book;