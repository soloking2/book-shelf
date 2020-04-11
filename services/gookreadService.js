const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadService');

const parser = xml2js.Parser({ explicitArray: false });

function goodReadService() {
  function getBookId(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=ucGbUBSAHyHhXfsUM5zACQ`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  return { getBookId };
}

module.exports = goodReadService();
