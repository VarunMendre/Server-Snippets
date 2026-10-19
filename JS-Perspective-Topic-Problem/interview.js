/* 1. 
var a = 500;

{
    var a = -500;
}

let b = a;

{
    let b = -1000;
}

console.log(b); // -500
*/

/*
console.log({} === {}); // false 
console.log({} == {});  // false

*/


const arr = ["Varun", 88, 21, "there", 'c', 'a'];


function separation(arr) {
    const numbers = [];
    const strings = [];
    const characters = [];

    for (let el of arr) {
        if (typeof el === "number")
            numbers.push(el);
        else if (typeof el === 'string') {
            if (el.length > 1)
                strings.push(el)
            else
                characters.push(el);
        } 
        
    }

    return [numbers, strings, characters];
}


const [numbers, strings, characters] = separation(arr);

console.log(numbers);
console.log(strings);
console.log(characters);