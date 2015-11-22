/*small file copy...*/
var fs= requir('fs');

function copylite(src,des){
	fs.writeFileSync(dst,fs.readFileSync(src));
}


function copybig(src,des){
	fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}


function main(argv){	
	copylite(argv[0],argv[1])
}




main(process.argv.slice(2));