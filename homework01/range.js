function range(first, last, step) {

	var output = [];

 	// If one arg
 	if (last===undefined && step===undefined) {
 		for(var i = 0; i < first; i++) {
 			output.push(i);
 		}
 		return output;
 	};

 	// If two args
 	if (step===undefined) {
 		for (var i = first; i < last; i++) {
 			output.push(i);
 		}
 		return output; 
 	}; 

 	// Three args: Counting up
 	if ( (first < last) && (step > 0) ) { 
 		for (var i = first; i < last; i += step) { 
 			output.push(i); 
 		} 
 		return output; 
 	};

 	// Three args: Counting down
 	if ( (first > last) && (step < 0) ) {	
 		for (var i = first; i >= last; i += step) { 
 			output.push(i); 
 		} 
 	 	return output;
 	 };

 	 // None of the above (error)
 	 return output;

}

// Test
console.log(range(5));
console.log(range(2, 5));
console.log(range(2, 9, 2));
console.log(range(5, 1, -1));
console.log(range(6, -1, -2));
console.log(range(6, -1, 1));

