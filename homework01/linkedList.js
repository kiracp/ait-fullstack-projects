
function arrayToList(values) {

	var mylist = { 
	  value: null,
	  rest: null
	};

	for (var i = 0; i < values.length; i++){
		// Local var to hold info
		var node = {
			value: values[i],
			rest: null
		}

		// If head
		if (mylist.value == null ) {
			mylist.value = node.value;
		}
		else {
			var current = mylist;
			while (current.rest) {
				current = current.rest;
			}
			current.rest = node;
		}

	}
	return mylist;
}

function listToArray(list) {
	var array = [];
	for (var node = list; node; node = node.rest) {
		array.push(node.value);
	}
	return array;

}

function nth(list, n) {
	var elem = 0;

	// Base case: found our n index
	if (n == 0) {
		return list.value;
	}

	// Else
	n--;
	list = list.rest;
	return nth(list, n);
}

