// var foo1 = require('./foo');
// var foo2 = require('./foo.js');
// var foo3 = require('/home/user/foo');
// var foo4 = require('/home/user/foo.js');

exports.hello = function(){
	console.log('Hello exports.hello!')
}

modules.exports = function(){
	console.log('hello modules.exports')
}


