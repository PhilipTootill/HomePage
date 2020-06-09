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
