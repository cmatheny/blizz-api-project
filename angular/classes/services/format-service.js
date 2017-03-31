/*
 * Intended to be used as a globally available reference to the currently loaded character.
 */
angular.module("routerApp").service("FormatService", function () {

    var self = this;

    /*
     * Formats a number into a short string with M or K suffix and 2 decimal places
     */
    self.shortNumberWithSuffix = function (number) {
        if (!number)
            return null;
        var numStr = number.toString();
        var suffixes = ["", " K", " M"];
        var grouping = Math.floor((numStr.length - 1) / 3);
        var places = numStr.length % 3 || 3;
        var leftOfDecimal = numStr.substr(0, places);
        if (grouping > 0) {
            var rightOfDecimal = "." + numStr.substr(places, 2);
        } else {
            rightOfDecimal = "";
        }
        return leftOfDecimal + rightOfDecimal + suffixes[grouping];
    };

    /*
     * Inject commas into a number, returning a string (Integer only)
     */
    self.commafy = function (number) {
        if (number === undefined)
            return null;
        if (number === 0)
            return 0;
        var numStr = number.toString();
        var newStr = "";
        var counter;
        var maxCount = Math.floor((numStr.length) / 3);
        var leftover = numStr.length % 3;
        var pieceArray = [];
        var start = -3;

        // Start from end and add each group of 3 to the array
        for (counter = 0; counter < maxCount; counter++, start -= 3) {
            pieceArray.push(numStr.substr(start, 3));
        }

        // Add the incomplete group leftovers
        if (leftover !== 0) {
            pieceArray.push(numStr.substr(0, leftover));
        }

        // Iterate backwards and join with commas
        for (counter = pieceArray.length - 1; counter >= 0; counter--) {
            newStr += pieceArray[counter] + ",";
        }

        // trim trailing comma
        return newStr.substring(0, newStr.length - 1);
    };

    /*
     * Takes a string and a format string, finds where %s is in the format string,
     * and injects the other string at that location. Currently only works for a single
     * string injection.
     */
    self.injectStringToFormat = function (insertString, formatString) {
        var injectIndex = formatString.indexOf("%");
        return formatString.substr(0, injectIndex) + insertString + formatString.substr(injectIndex+2);
    };

});
