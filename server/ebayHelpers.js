const axios = require('axios');
require('dotenv').config();

const ebay = process.env.EBAY_APP_ID;

const ebayPost = (title) => {
  const encodedTitle = `${title} book`;
  return axios.get(`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${ebay}&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD=&keywords=${encodedTitle}&paginationInput.entriesPerPage=3`);
};

const ebaySearchFormatter = (ebaySearchObject) => {
  const { findItemsByKeywordsResponse: [itemsProperties] } = ebaySearchObject;
  const { searchResult: [searchResults] } = itemsProperties;
  const { resultsInsideSearchrResults } = searchResults;
  // const { [item] } = resultsInsideSearchrResults;
};

const ebayFormatter = ebaySearchObject => JSON.stringify(ebaySearchObject);

const ebaySlicer = ebayStrungObject => ebayStrungObject.slice(29);

const ebayHelpers = {
  ebayPost,
  ebayFormatter,
  ebaySlicer,
};


const bestEver = {
  me: 'jvalamis@gmail.com',
};
module.exports.ebayHelpers = ebayHelpers;
