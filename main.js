//MAIN.JS

 var counter1=require('./util/counter')
 var counter2=require('./util/counter')
 
function main(){

console.log('this main function');
console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
}

main();