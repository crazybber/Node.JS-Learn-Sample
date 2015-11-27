//queryString

var querystring= require('querystring');

var ret =querystring.parse('foo=bar&baz=qux&baz=queex&corge');

console.log(ret);


ret  =  querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });

console.log(ret);