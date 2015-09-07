'use strict';

var $ = require('jquery');

// Azure secret and base url
var APP_ID   = '0626471d-8373-4bae-97cb-29382cd8608a';
var APP_KEY  = 'b7P/I3+pdfsztU+lLmHWvt61xqSC3uFIZQlxvD2xH+4';
var BASE_URL = 'https://api.datamarket.azure.com/Bing/Search/v1/Web';

function runSearch(query, cb) {
  query.Query = typeof query.Query !== 'undefined' ? '\'' + query.Query + '\'' : undefined;
  $.support.cors = true;
  $.ajax({
    beforeSend: function (xhr) {  
      xhr.setRequestHeader('Authorization', 'Basic ' + global.btoa(APP_ID + ':' + APP_KEY));  
    },
    url: BASE_URL + '?$format=json&' + $.param(query), 
    dataType: 'json',
    success: function (data) {
      console.log('success', data);
      cb(data.d.results);
    },
    error: function (error) {
      console.error(error);
    }
  });
}

module.exports = {
  search: runSearch
};
