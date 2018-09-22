const axios = require('axios');
require('dotenv').config();

const ebay = process.env.EBAY_APP_ID;

const ebayPost = (title) => {
  const encodedTitle = `${title} book`;
  return axios.get(`http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=${ebay}&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&keywords=${encodedTitle}&paginationInput.entriesPerPage=3`);
};

// const ebayPost = (title) => {
//test
//   const encodedTitle = `${title} book`;
//   const params = {
//     'OPERATION-NAME': 'findItemsByKeywords',
//     'SERVICE-VERSION': '1.0.0',
//     'SECURITY-APPNAME': ebay,
//     'GLOBAL-ID': 'EBAY-US',
//     'RESPONSE-DATA-FORMAT': 'JSON',
//     'REST-PAYLOAD': '',
//     'keywords': encodedTitle,
//     'paginationInput.entriesPerPage': 3,
//   };
//   return axios.get('http://svcs.ebay.com/services/search/FindingService/v1', { params });
// };

const getItemInformation = (obj) => {
  const { findItemsByKeywordsResponse: [{ searchResult: [{ item: [{ title, galleryURL, viewItemURL }] }] }] } = obj;

  const informationObject = {
    title: title[0],
    galleryURL: galleryURL[0],
    viewItemURL: viewItemURL[0],
  };
  return informationObject;
};

const getItemUrl = (obj) => {
  const { findItemsByKeywordsResponse: [{ itemSearchURL }] } = obj;

  const urlObject = {
    itemURL: itemSearchURL[0],
  };
  return urlObject;
};

const createFullItemInformation = (emptyObject, object1, object2) => Object.assign(emptyObject, object1, object2);

const ebayHelpers = {
  ebayPost,
  getItemInformation,
  getItemUrl,
  createFullItemInformation,
};


const bestEver = {
  me: 'jvalamis@gmail.com',
};
module.exports.ebayHelpers = ebayHelpers;
