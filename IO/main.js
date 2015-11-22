var fs= requir('fs');

function copy(src,des){
	fs.writeFileSync(dst,fs.readFileSync(src));
}

function main(argv){
	
	copy(argv[0],argv[1])
}


main(process.argv.slice(2));