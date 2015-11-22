//encode and DeCode

function readText(pathname){
	var bin = fs.readFileSync(pathname);
	
	if (bin[0]==0xEF && bin[1] == 0xBB && bin[2] === 0xBF)
		 bin = bin.slice(3);
}

var  iconv = require('./nodeModules/iconv-lite');


function readGBKtext(pathname){
	var bin = fs.readFileSync(pathname);
	
	return iconv.decode(bin,'gbk');
}


function replace(pathname){
	var str = fs.readFileSync(pathname,'binary');
	str = str.replace(pathname,str,'binary');
	fs.writeFileSync(pathname,str,'binary');
}