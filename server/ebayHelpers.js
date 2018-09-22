const axios = require('axios');
require('dotenv').config();

const ebay = process.env.EBAY_APP_ID;

const ebayPost = (title) => {
  const encodedTitle = `${title} book`;
  return axios.get(`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${ebay}&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD=&keywords=${encodedTitle}&paginationInput.entriesPerPage=3`);
};

const ebayHelpers = {
  ebayPost,
};

module.exports.ebayHelpers = ebayHelpers;
