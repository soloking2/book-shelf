const debug = require('debug')('app:adminRouter');
const { MongoClient } = require('mongodb');

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    bookId: 50,
    read: false
  },
  {
    title: 'Purple Hibiscus',
    genre: 'Historical Fiction',
    author: 'Chimamanda Adichie',
    bookId: 656,
    read: false
  },
  {
    title: 'Things fall Apart',
    genre: 'Historical Fiction',
    author: 'Chinua Achebe',
    bookId: 18541,
    read: false
  }
];

// eslint-disable-next-line no-unused-vars
exports.addBook = (req, res, next) => {
  const url = 'mongodb://localhost:27017';
  const dbName = 'libraryApp';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected correctly to server');

      const db = client.db(dbName);

      const response = await db.collection('books').insertMany(books);
      res.json(response);
    } catch (err) {
      debug(err.stack);
    }

    client.close();
  }());
};
