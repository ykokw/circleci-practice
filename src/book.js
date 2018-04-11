class Book {
    getList (ctx) {
        ctx.body = 'getList';
    }
    register (ctx) {
        ctx.body = 'register';
    }
}

module.exports = Book;