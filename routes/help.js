
/*
 * GET home page.
 */

var data = require("../data.json");

exports.view = function(req, res){
  res.render('help', data);
};