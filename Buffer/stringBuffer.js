var bin= new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

var chart = bin[0];

var string = bin.toString('utf-8');

console.log(string);

bin = new Buffer('Hello','utf-8')

console.log(bin);


bin[0]=0x88;

console.log(bin[0]);

var binn = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);

var sub = binn.slice(2);

sub[0]=0x66;

console.log(binn);

var dup = new Buffer(binn.length);

bin.copy(dup);

dup[0]=0x98;

console.log(binn)
console.log(dup)

