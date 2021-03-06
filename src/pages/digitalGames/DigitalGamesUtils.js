/*
 * Return a random multiple of an integer, between a given minimum or maximum.
 */
export const randomInteger = function(max, min, multiple) {
    var range = max - min + 1;
    var multipleRange = Math.floor(range / multiple);
    var multipleLowerLimit = Math.floor(min / multiple) - 1;

    var random = Math.random(); //Between 0 and 1.
    random = random * multipleRange; // Between 0 and multipleRange.
    random = Math.ceil(random); //Integer between 1 and multipleRange
    random = random + multipleLowerLimit;
    random = random * multiple; //Definitely a multiple.

    return random;
}


export const shuffleArray = function(array) {
    var counter = array.length;

    while(counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;

        var element = array.splice(index, 1);
        array.push(element[0]);
    }
}

export const arraysMatch = function(arr1, arr2) {
    arr1.sort();
    arr2.sort();

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}