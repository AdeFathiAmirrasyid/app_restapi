'use strict';

module.exports = function(app){
  var myjson = require('./controller');

  app.route('/')
    .get(myjson.index);

  app.route('/show')
    .get(myjson.show_mahasiswa);

  app.route('/show/:id')
    .get(myjson.show_mahasiswa);

}