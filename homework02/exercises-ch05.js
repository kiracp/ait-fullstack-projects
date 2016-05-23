// EXERCISE: FLATTEN ARRAY

var arrays = [[2, 4, 6], [8], [10, 12]];

var result = arrays.reduce(function(ele, accum){
	return accum.concat(ele);
}, []);

// TEST
console.log("Original:", arrays);
console.log("Flattened:", result);


//EXERCISE: EVERY AND SOME

console.log("Running every...");

function every(array, f) {
	var bool = true;
	array.forEach( function(ele) {
		if (f(ele) === false) {
			bool = false;
			return bool;
		}
	});
	return bool;
}

console.log(every([9, 48, 204, 528942], function(x){ return (x%3 === 0);}))

console.log("Running some...")
function some(array, f) {
	var bool = false;
	array.forEach( function(ele) {
		if (f(ele) === true) {
			bool = true;
			return bool;
		}
	});
	return bool;
}

console.log(some(['aardvark', 'abbreviate', 'abacuses', 'abandoners', 'abalones'], function(x){return(x.length === 9);}))


