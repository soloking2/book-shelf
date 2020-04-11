const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:library');

const bookService = require('../services/gookreadService');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';
exports.getBooks = (req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the server');

      const db = client.db(dbName);

      const results = await db.collection('books');

      const books = await results.find().toArray();
      res.render('books', {
        books,
        pageTitle: 'Books',
        path: ''
      });
    } catch (err) {
      debug(err.stack);
    }
    client.close();
  }());
};

exports.getSingle = (req, res) => {
  const { id } = req.params;
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to server');

      const db = client.db(dbName);

      const col = await db.collection('books');

      const book = await col.findOne({
        _id: new ObjectID(id)
      });

      book.details = await bookService.getBookId(book.bookId);
      res.render('single-book', {
        pageTitle: 'Books',
        path: '',
        book
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  }());
};
