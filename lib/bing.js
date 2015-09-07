'use strict';

var $ = require('jquery');
var _ = require('lodash');

// Azure secret and base url
var APP_ID   = '0626471d-8373-4bae-97cb-29382cd8608a';
var APP_KEY  = 'b7P/I3+pdfsztU+lLmHWvt61xqSC3uFIZQlxvD2xH+4';
var BASE_URL = 'https://api.datamarket.azure.com/Bing/Search/v1/Web';

function runSearch(query, cb) {
  var q = _.clone(query);
  q.Query = typeof q.Query !== 'undefined' ? '\'' + q.Query + '\'' : '\'\'';
  $.support.cors = true;
  $.ajax({
    beforeSend: function (xhr) {  
      xhr.setRequestHeader('Authorization', 'Basic ' + global.btoa(APP_ID + ':' + APP_KEY));  
    },
    url: BASE_URL + '?$format=json&' + $.param(q), 
    dataType: 'json',
    success: function (data) {
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
