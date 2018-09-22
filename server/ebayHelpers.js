const request = require('request');

const createKeyWordForSearch = keyword => encodeURI(`${keyword} book`);

const ebayPost = (keyWordSearch, cb) => {
  const options = {
    method: 'POST',
    url: `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=JanAlami-booksqui-PRD-8820bcb7d-cbda6bb8&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=${keyWordSearch}&paginationInput.entriesPerPage=3`,
  };
  request(options, cb);
};

const ebayHelpers = {
  createKeyWordForSearch,
  ebayPost,
};

module.exports.ebayHelpers = ebayHelpers;
