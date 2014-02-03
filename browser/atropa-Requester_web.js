(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Requester = require('../src/atropa-Requester.js');

try {
    Object.keys(Requester).forEach(
        function (prop) {
            if(!atropa[prop]) {
                atropa[prop] = Requester[prop];
            }
        }
    );
} catch (ignore) {
    atropa = require('../src/atropa-Requester.js');
}

Object.keys(Requester.data).filter(
    function (prop) {
        return prop !== 'requirements';
    }
).forEach(
    function (prop) {
        atropa.data[prop] = Requester.data[prop];
    }
);

},{"../src/atropa-Requester.js":13}],2:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global XPathResult */
// end header

/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = {};
/**
 * Checks whether this class has been marked as unsupported and throws an 
 *  error if it has.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {String} errorMessage Optional. A custom error message. Defaults to
 *  atropa.data[className].error
 */
atropa.supportCheck = function (className, errorMessage) {
    "use strict";
    className = String(className);
    errorMessage = errorMessage || atropa.data[className].error;
    errorMessage = String(errorMessage);
    
    if(atropa.data[className].support === 'unsupported') {
        throw new Error(errorMessage);
    }
};
/**
 * Pushes a requirement check into atropa.data.requirements. The test
 *  tests whether the class is supported in this environment. Sets
 *  atropa.data[className]'s support to unsupported and error to errorMessage
 *  if the requirementFn returns false. The requirement checks will all be run
 *  after the library has loaded.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130308
 * @param {String} className The name of the class.
 * @param {Function} requirementFn A function to test whether or not the class
 *  is supported in this environment. If supported, returns true otherwise
 *  return false.
 * @param {String} errorMessage The error message to use when this class or its
 *  methods are called in unsupported environments. Defaults to:
 *  'The atropa.' + className + ' class is unsupported in this environment.';
 */
atropa.requires = function (className, requirementFn, errorMessage) {
    "use strict";
    var check = function () {
        var test = false;
        if(typeof className !== 'string') {
            throw new Error('atropa.requires requires the class name to be ' +
                'specified');
        }
        
        if(atropa.data[className] === undefined) {
            atropa.data[className] = {};
            
            if(typeof requirementFn !== 'function') {
                requirementFn = false;
            }
            errorMessage = errorMessage || 'The atropa.' + className +
                    ' class is unsupported in this environment.';
            try {
                test = requirementFn();
            } catch (e) {
                test = false;
            }
            
            atropa.data[className].error = errorMessage;
            
            if(test === false) {
                atropa.data[className].support = 'unsupported';
            }
        }
    };
    
    atropa.data.requirements.push(check);
};
/**
 * Container for gobal data related to the classes and functions.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for gobal data related to the classes and functions.
 */
atropa.data = {};

atropa.data.requirements = [];

atropa.nop = function nop () {
    "use strict";
    return null;
};
module.exports = atropa;


},{}],3:[function(require,module,exports){
module.exports=require(2)
},{}],4:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Container for functions that test the state of inputs.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @namespace Container for functions that test the state of inputs.
 */
atropa.inquire = {};
/**
 * Checks whether the input is null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be null.
 * @returns {Boolean} Returns true if x === null.
 */
atropa.inquire.isNull = function (x) {
    "use strict";
    return (x === null);
};
/**
 * Checks whether the input is an object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be an object.
 * @returns {Boolean} Returns true if typeof(x) === 'object'.
 */
atropa.inquire.isObject = function (x) {
    "use strict";
    return (typeof x === 'object');
};
/**
 * Checks whether the input is both an object and not null.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Mixed} x Any input that may or may not be both an
 * object and null.
 * @returns {Boolean} Returns true if x is both an object and
 * not null. (null is an object).
 */
atropa.inquire.isObjectNotNull = function (x) {
    "use strict";
    return atropa.inquire.isObject(x) && (!atropa.inquire.isNull(x));
};
/**
 * Checks an object for the existence of a property
 * regardless of whether the property was inherited
 * or not.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Object} obj An object which may or may not
 * have the property identified by prop.
 * @param {String} prop A string value representing the
 * name of the property.
 * @returns {Boolean} Returns true if obj.prop exists,
 * otherwise returns false.
 */
atropa.inquire.hasProperty = function (obj, prop) {
    "use strict";
    if (atropa.inquire.isObjectNotNull(obj)) {
        return (prop in obj);
    }
    return false;
};
/**
 * Checks whether the input is an empty string.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {String} str The string you want to know about
 * @returns {Boolean} Returns true if str is an empty string,
 *  otherwise returns false.
 */
atropa.inquire.isEmptyString = function (str) {
    "use strict";
    var out = false;
    if ('' === str) {
        out = true;
    }
    return out;
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":3}],5:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * Utilities for handling arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @namespace Utilities for handling arrays.
 */
atropa.arrays = {};
/**
 * Compares two arrays based on size, contents, and element order.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20120909
 * @param {Array} array1 One array you want compared to another.
 * @param {Array} array2 The other array.
 * @returns {Boolean} Returns true or false depending on
 *  whether or not the arrays matched in size, composition, and
 *  element order.
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.match(x,y);
 * // returns false
 * @example
 * var x = [1,2];
 * var y = [1,2];
 * atropa.arrays.match(x,y);
 * // returns true
 * @example
 * var x = [1,2];
 * var y = [2,1];
 * atropa.arrays.match(x,y);
 * // returns false because the elements are not in the same order.
 * @example
 * var x = [1,{'aProp' : 'aValue'}];
 * var y = [1,{'aProp' : 'aValue'}];
 * atropa.arrays.match(x,y);
 * // returns false because even though the object looks the same, the
 * // two objects are in fact distinct objects.
 * @example
 * var obj = {'aProp' : 'aValue'};
 * var x = [1,obj];
 * var y = [1,obj];
 * atropa.arrays.match(x,y);
 * // returns true because the objects referenced in the arrays are
 * // in fact the same object.
 */
atropa.arrays.match = function arraysMatch(array1, array2) {
    "use strict";
    var x,
    l;
    if (array1.length !== array2.length) {
        return false;
    }
    l = array1.length;
    for (x = 0; x < l; x += 1) {
        if (array1[x] !== array2[x]) {
            return false;
        }
    }
    return true;
};
/**
 * Subtracts one array from another array based on the unique values in both
 *  sets.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} a (subtrahend) The array to subtract.
 * @param {Array} fromB (minuend) The array with elements duplicated in <code>a</code>
 * @returns {Array} Returns a new array containing only the unique
 *  values found in <code>fromB</code> that are not present in <code>a</code>
 * @example
 * var x = [1,2];
 * var y = [1,1,3];
 * atropa.arrays.subtract(x,y);
 * // returns [3]
 * @example
 * var x = [1,3];
 * var y = [3,1];
 * atropa.arrays.subtract(x,y);
 * // returns []
 * @example
 * var x = [1,3];
 * var y = [3,1,1,9];
 * atropa.arrays.subtract(x,y);
 * // returns [9]
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.subtract(x,y);
 * // returns [{'aProp' : 'aVal'}] 
 * // because the two objects are not the same object.
 * @example
 * var obj = {'aProp' : 'aVal'}
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.subtract(x,y);
 * // returns [] 
 * // because the objects referenced in the arrays are the same object.
 */
atropa.arrays.subtract = function(a, fromB) {
    "use strict";
    var the = {};
    the.result = [];
    fromB.forEach(function(item){
        the.mark = false;
        a.forEach(function(rm){
            if(item === rm) {
                the.mark = true;
            }
        });
        if(the.mark !== true) {
            the.result.push(item);
        }
    });
    return the.result;
};
/**
 * Returns an array of values found in both of the given arrays.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130112
 * @param {Array} array1 An array.
 * @param {Array} array2 Another array.
 * @returns {Array} Returns an array of values found in both of the given
 *  arrays.
 * @example
 * var x = [1,3,4];
 * var y = [3,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3]
 * @example
 * var x = [1,1,3,4];
 * var y = [3,1,1,5];
 * atropa.arrays.intersect(x,y);
 * // returns [1,1,3]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,obj];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3,{'aProp' : 'aVal'}]
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,obj];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * var y = [3,1,{'aProp' : 'aVal'}];
 * atropa.arrays.intersect(x,y);
 * // returns [1,3] because the two objects are not the same object.
 */
atropa.arrays.intersect = function intersect(array1, array2) {
    "use strict";
    var smallArray, largeArray, intersection = [];
    if(array1.length > array2.length) {
        largeArray = array1.splice(0);
        smallArray = array2.splice(0);
    } else {
        largeArray = array2.splice(0);
        smallArray = array1.splice(0);
    }
    smallArray.forEach(function (item) {
        var idxInLargeArray = largeArray.indexOf(item);
        if (0 <= idxInLargeArray) { // has word
            intersection.push(largeArray.splice(idxInLargeArray, 1)[0]);
        }
    });
    return intersection;
};
/**
 * Calculates the frequency of items occurring in an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array to calculate frequencies from.
 * @returns {Object} Returns an object whose keys are each unique
 *  elements from the array and their value is their frequency of
 *  occurrence within the array. Be careful that your array does
 *  not contain values matching object instance property names.
 * @example
 * var x = [1,1,1,1,1,3,3];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 5,
 * //     "3": 2
 * // }
 * @example
 * var x = ["bill", "fred", "fred", "jane"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "bill": 1,
 * //     "fred": 2,
 * //     "jane": 1
 * // }
 * @example
 * var x = [1,3,{'aProp' : 'aVal'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 1
 * // }
 * @example
 * var obj = {'aProp' : 'aVal'};
 * var otherObj = {};
 * var x = [1,3,obj,otherObj,{'aDoughnut' : 'sprinkles'}];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "[object Object]": 3
 * // }
 * @example
 * var x = [1,3,"toString"];
 * atropa.arrays.getFrequency(x);
 * // returns {
 * //     "1": 1,
 * //     "3": 1,
 * //     "toString": "function toString() {\n    [native code]\n}1"
 * // }
 */
atropa.arrays.getFrequency = function (arr) {
    "use strict";
    var out = arr.reduce(function (acc, curr) {
        if (acc[curr] === undefined) {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }
        return acc;
    }, {});
    return out;
};
/**
 * Gets Unique values from an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} largeArray The array with duplicate values in it.
 * @returns {Array} Returns a new array containing only the unique
 *  values found in the largeArray.
 * @example
 * var x = [1,1,1,4,4,3,6];
 * atropa.arrays.getUnique(x);
 * // returns [ "1", "4", "3", "6" ]
 * @example
 * var x = ["bill", "fred", "jane", "fred"];
 * atropa.arrays.getUnique(x);
 * // returns ["bill", "fred", "jane"]
 * @example
 * var x = [ 
 *     "bill",
 *     {"aProp" : "aValue"},
 *     {"aGuy" : "fred"},
 *     {"aLady" : "jane"}
 * ];
 * atropa.arrays.getUnique(x);
 * // returns [ "bill", "[object Object]" ]
 */
atropa.arrays.getUnique = function (largeArray) {
    "use strict";
    return Object.keys(atropa.arrays.getFrequency(largeArray)).sort();
};
/**
 * Removes empty strings from the given array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arrayWithEmptyElements The array with empty strings in it.
 * @returns {Array} Returns a new array with empty strings removed.
 * @example
 * var x = [ 10, , 5, "", '', 7 ];
 * console.log('starting length ' + x.length);
 * console.log(x);
 * x = atropa.arrays.removeEmptyElements(x);
 * console.log('ending length ' + x.length);
 * console.log(x);
 * // displays the following
 * // starting length 6
 * // [10, undefined, 5, "", "", 7]
 * // ending length 3
 * // [10, 5, 7]
 */
atropa.arrays.removeEmptyElements = function (arrayWithEmptyElements) {
    "use strict";
    return arrayWithEmptyElements.filter(function (item) {
        return !atropa.inquire.isEmptyString(item);
    });
};
/**
 * Reindexes an array.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130118
 * @param {Array} arr The array with discontinuous keys.
 * @returns {Array} Returns an array with continuous keys.
 * @example
 * var x = [ "a", "b", "c", undefined ];
 * console.log(x); // [ "a", "b", "c", undefined ]
 * console.log(x.length); // 4
 * 
 * delete x[1]; // deletes the key from the array but
 *              // the array length remains the same
 *              // at this point the arrays keys are 0, 2, and 3
 * console.log(x); // [ "a", undefined, "c", undefined ]
 * console.log(x.length); // 4
 * 
 * x = atropa.arrays.reindex(x);
 * console.log(x); //  [ "a", "c", undefined ]
 *    // note that the last element existed in the array, its value was
 *    // undefined but it did have a key so the element remains in the array.
 *    //
 *    // The deleted element was in fact deleted from the array so there was no
 *    // key x[1] at all, when trying to access this non existing element the
 *    // value of undefined was returned. This behavior is confusing unless you
 *    // think about the arrayas an object whose properties are named by
 *    // numbers. Accessing an undefined property returns undefined regardless
 *    // of whether the property existed in the past or not.
 * console.log(x.length); // 3
 */
atropa.arrays.reindex = function reindex(arr) {
    "use strict";
    var idx, out;
    out = [];
    for(idx in arr) {
        if(arr.hasOwnProperty(idx)) {
            out.push(arr[idx]);
        }
    }
    return out;
};
/**
 * Sorts an array's elements numerically.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130120
 * @param {Array} arr The array to sort. All elements of the array must be
 *  number-ish.
 * @returns {Array} Returns an array whose elements are in numeric order.
 * @example
 * var x = [3, 2, 9, 26, 10, 1, 99, 15];
 * console.log( atropa.arrays.sortNumerically(x) );
 * // logs [1, 2, 3, 9, 10, 15, 26, 99]
 */
atropa.arrays.sortNumerically = function sortNumerically(arr) {
    "use strict";
    return arr.sort(function (a, b) {
        return (a - b);
    });
};
/**
 * Throws an error, <code>String.prototype.localeCompare</code> is not 
 *  standardized.
 * 
 *  Yes, localeCompare is in the standard but, at this time the actual
 *  comparison is implementation dependant. This means that "alphabetical order"
 *  can be different on different platforms. What I found was that in node the
 *  array of <code>['a','Z','A','z']</code> would be sorted to
 *  <code>['A','Z','a','z"]</code>, while on
 *  firefox it would be sorted to <code>['a','A','z','Z']</code>. Who knows if
 *  another implementor would sort it <code>['A','a','Z','z']</code>?
 * 
 * In order to provide a reliable implementation I would have to create my own
 *  implementation of <code>String.prototype.localeCompare</code> and that's
 *  just too much work for me to do alone.
 * @throws {Error} "String.prototype.localeCompare is not standardized"
 */
atropa.arrays.sortAlphabetically = function sortAlphabetically(arr) {
    "use strict";
    throw new Error("String.prototype.localeCompare is not standardized");
};
/**
 * Deletes the given element from the array at the given index. It basically
 *  does what you would expect the delete operator to do, except the delete
 *  operator doesn't do what you would expect.
 * @param {Array} arr The array.
 * @param {Number} index The index of the element to delete.
 * @returns Returns an array with the element removed, contiguous keys, and
 *  whose length is 1 less than the input array.
 */
atropa.arrays.deleteElement = function (arr, index) {
    "use strict";
    delete arr[index];
    return atropa.arrays.reindex(arr);
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":2,"atropa-inquire":4}],6:[function(require,module,exports){
module.exports=require(2)
},{}],7:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header
/**
 * Container for custom Errors.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for custom Errors.
 */
atropa.customErrors = {};

/**
 * Invalid Argument Types Error
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class Invalid Argument Types Error
 * @param {String} message Optional. The error message to send. Defaults to
 *  <code>InvalidArgumentTypesError</code>
 * @returns {Error} Returns an instance of the InvalidArgumentTypesError
 */
atropa.customErrors.InvalidArgumentTypesError = function InvalidArgumentTypesError(message) {
    'use strict';
    /**
     * The name of the error. Tells the user what kind of custom
     * error has been thrown.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "atropa.customErrors.InvalidArgumentTypesError"
     */
    this.name = "atropa.customErrors.InvalidArgumentTypesError";
    /**
     * The error message to send.
     * @fieldOf atropa.customErrors.InvalidArgumentTypesError#
     * @type {String}
     * @default "InvalidArgumentTypesError"
     */
    this.message = message || "InvalidArgumentTypesError";
};
atropa.customErrors.InvalidArgumentTypesError.prototype = new Error();
atropa.customErrors.InvalidArgumentTypesError.prototype.constructor = 
    atropa.customErrors.InvalidArgumentTypesError;




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-header":6}],8:[function(require,module,exports){
module.exports=require(2)
},{}],9:[function(require,module,exports){
module.exports=require(2)
},{}],10:[function(require,module,exports){
module.exports=require(4)
},{"atropa-header":9}],11:[function(require,module,exports){
/// <reference path="../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.inquire = require('atropa-inquire').inquire;
atropa.arrays = require('atropa-arrays').arrays;
atropa.customErrors = require('atropa-customErrors').customErrors;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

/**
 * This represents a filter for arguments based on type.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130221
 * @class This represents a filter for arguments based on type.
 * @returns {ArgsInfo} Returns an ArgsInfo filter.
 * @requires atropa.arrays.match
 * @example
 * function myClassyConstructor(takes, a, few, args) {
 *     var expectedArgTypes, checker;
 *     
 *     expectedArgTypes = {};
 *     expectedArgTypes.requestWithMessage = 
 *          ['string', 'string', 'string', 'function'];
 *     expectedArgTypes.requestNullMessage = 
 *          ['string', 'string', 'object', 'function'];
 *     
 *     checker = new atropa.ArgsInfo();
 *     checker.setExpectedArgTypes(expectedArgTypes);
 *     
 *     try {
 *     
 *         // Check the supplied arguments pseudo array's argument types
 *         // if the pattern of types in arguments matches one of the
 *         // patterns set on expectedArgTypes then the matching pattern
 *         // will be returned. Otherwise, an error will be thrown.
 *         
 *         checker.checkArgTypes(arguments);
 *     } catch (e) {
 *     
 *         // Invalid argument types supplied. Handle
 *         // the error or bail.
 *         
 *     }
 *     
 *     // the arguments supplied will be of the proper type
 *     // your function can go ahead and do things with them
 * }
 */
atropa.ArgsInfo = function ArgsInfo() {
    'use strict';
    var expectedArgTypes,
    checkArgs,
    that;
    /**
     * Holds the proper reference to <code>this</code>
     * for private functions.
     * @type This
     * @private
     * @fieldOf atropa.ArgsInfo-
     */
    that = this;
    /**
     * Holds the expected argument types object.
     * @private
     * @type Expected Arg Types
     * @fieldOf atropa.ArgsInfo-
     */
    expectedArgTypes = {};
    /**
     * Sets the expected argument types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {Expected Arg Types} typesObj An object containing information
     *  about the types of arguments you expect. Specifically, the object should
     *  look like the example.
     * @example
     * // typesObj is expected to be of the form:
     * 
     * var typesObj = {
     *     "namedArgumentTypesArray" : ["string", "function", "number"],
     *     "namedAlternateArgumentTypesArray" : ["object", "function", "number"]
     * };
     * 
     * // You may use as many named arrays as you wish and checkArgTypes will
     * // test for a match to at least one of the provided named arrays.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if the
     *  typesObj can not be used to set the expected argument types.
     */
    this.setExpectedArgTypes = function setExpectedArgTypes(typesObj) {
        var error, names;
        
        error = false;
        
        if(atropa.inquire.isObjectNotNull(typesObj)) {
            names = Object.keys(typesObj);
            if (names.length > 0) {
                expectedArgTypes = typesObj;
            } else {
                error = true;
            }
        } else {
            error = true;
        }
        
        if(error) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'typesObj is expected to be of the form: var typesObj = ' +
                '{ "namedArgumentTypesArray" : ' +
                '    ["string", "function", "number"], ' +
                '"namedAlternateArgumentTypesArray" : ' +
                '   ["object", "function", "number"] }; ' +
                'You may use as many named arrays as you wish and' +
                'checkArgTypes will test for a match to at least one of the ' +
                'provided named arrays.'
            );
        }
    };
    /**
     * Gets the types of arguments.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object, or anything you want to
     * check the type of.
     * @returns {Array} Returns an array of the types of arguments passed in.
     */
    this.getArgTypes = function getArgTypes(args) {
        var x,
        argTypes;
        argTypes = [];
        for (x in args) {
            if (args.hasOwnProperty(x)) {
                argTypes.push(typeof(args[x]));
            }
        }
        return argTypes;
    };
    /**
     * Compares the expected arguments types to the
     * received arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @private
     * @methodOf atropa.ArgsInfo-
     * @param {Array} expectedTypesArray An array taken from the user
     * created argument types object.
     * @param {arguments} args an arguments object.
     * @returns {Boolean} Returns true if the expected types match for type
     *  and are in the same order as the received types.
     * @requires atropa.arrays.match
     */
    checkArgs = function checkArgs(expectedTypesArray, args) {
        var types;
        types = {};
        types.expected = expectedTypesArray;
        types.received = that.getArgTypes(args);
        return atropa.arrays.match(types.expected, types.received);
    };
    /**
     * Checks the given arguments object against the expected
     * arguments types.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @methodOf atropa.ArgsInfo#
     * @param {arguments} args An arguments object
     * @returns {String} The user assigned key which matches the
     * arguments supplied, or throws an error.
     * @throws {atropa.customErrors.InvalidArgumentTypesError} Throws an error if no matching
     *  pattern of argument types can be found for <code>args</code>
     * @see atropa.ArgsInfo#setExpectedArgTypes
     */
    this.checkArgTypes = function checkArgTypes(args) {
        var expectedTypes;
        if (Object.keys(expectedArgTypes).length < 1) {
            throw new atropa.customErrors.InvalidArgumentTypesError(
                'Expected argument types is not set. Use ' +
                'setExpectedArgTypes(typesObj) to set. typesObj is an ' +
                'object whose properties are arrays of strings representing ' +
                'the typeof(argument) for each argument, in the exact order ' +
                'in which they will be given to the function. Using multiple ' +
                'properties it is possible to define alternative acceptable ' +
                'argument type sets. Use getArgTypes(arguments) as a ' +
                'convenient way of getting the array you want to hard code ' +
                'in for validation. Example: var typesObj = ' +
                '{ "messageIncluded" : ["string", "function", "number"], ' +
                '"messageNotIncluded" : ["object", "function", "number"] };'
            );
        }
        for (expectedTypes in expectedArgTypes) {
            if (expectedArgTypes.hasOwnProperty(expectedTypes)) {
                if (checkArgs(expectedArgTypes[expectedTypes], args)) {
                    return expectedTypes;
                }
            }
        }
        throw new atropa.customErrors.InvalidArgumentTypesError(
            'invalid argument type @ atropa.ArgsInfo.checkArgTypes');
    };
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-arrays":5,"atropa-customErrors":7,"atropa-header":8,"atropa-inquire":10}],12:[function(require,module,exports){
module.exports=require(2)
},{}],13:[function(require,module,exports){
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
var atropa = require('atropa-header');
atropa.ArgsInfo = require('atropa-ArgsInfo').ArgsInfo;
/*jslint
    indent: 4,
    maxerr: 50,
    white: true,
    browser: true,
    devel: true,
    plusplus: true,
    regexp: true
*/
/*global atropa */
// end header

(function () {
    "use strict";
    atropa.requires(
        'Requester',
        function () {
            var supported = true;
            
            [
                atropa.ArgsInfo,
                XMLHttpRequest
            ].forEach(function (prerequisite) {
                if(prerequisite === undefined) {
                    supported = false;
                }
            });
            return supported;
        }
    );
}());

/**
 * This represents an XMLHttpRequest.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @version 20130311
 * @class This represents an XMLHttpRequest.
 * @returns {Requester} Returns a requester object.
 * @requires atropa.ArgsInfo#checkArgTypes
 * @example
 * var requester, formData;
 * 
 * requester = new atropa.Requester();
 * requester.timeout = 10000; // requests will abort after 10 seconds.
 * requester.requestHeaders = {
 *     "aHeader" : "headerValue",
 *     "anotherHeader" : "andValue"
 * };
 * 
 * function showRequestResults(status, request) {
 *     console.log("Status: ' + status);
 *     console.dir(request); // console dir may or may not
 *                        // be supported in your environment.
 * }
 * 
 * formData = new FormData();
 * formData.append('aFormFieldName', 'formFieldData');
 * formData.append('anotherFormFieldName', 'andData');
 * 
 * requester.makeRequest(
 *     "post", "http://example.com", formData, showRequestResults);
 */
atropa.Requester = function Requester() {
    "use strict";
    atropa.supportCheck('Requester');
    var expArgTypes,
        checkRequest,
        request;
    
    /**
     * Container object for the expected argument types
     * supplied to this.makeRequest.
     * @private
     * @type Expected Arg Types
     * @fieldOf atropa.Requester-
     */
    expArgTypes = {};
    expArgTypes.requestWithMessage = ['string', 'string', 'string', 'function'];
    expArgTypes.requestNullMessage = ['string', 'string', 'object', 'function'];
    
    /**
     * Used to check the arguments types supplied to this.makeRequest.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20120909
     * @private
     * @methodOf atropa.Requester-
     * @param {Arguments} args An arguments array
     * @returns {Boolean} Returns true if args types match the
     * expected types.
     * @requires atropa.ArgsInfo#checkArgTypes
     */
    checkRequest = function (args) {
        var checker;
        checker = new atropa.ArgsInfo();
        checker.setExpectedArgTypes(expArgTypes);
        return checker.checkArgTypes(args);
    };
    
    /**
     * Object whose properties and values are header names and values
     *  respectively.
     * @type Object
     * @fieldOf atropa.Requester#
     */
    this.requestHeaders = {};
    
    
    /**
     * Set the timeout value for the request in milliseconds. The request will
     *  abort after this amount of time has passed.
     * @type Number
     * @fieldOf atropa.Requester#
     */
    this.timeout = 30000;
    
    /**
     * XMLHttpRequest object used by Requester.
     * @private
     * @type XMLHttpRequest
     * @fieldOf atropa.Requester-
     */
    request = new XMLHttpRequest();
    request.aborted = false;
    request.abort = function() {
        request.aborted = true;
        XMLHttpRequest.prototype.abort.call(this);
    };
    
    /**
     * Makes an AJAX request.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @version 20130311
     * @methodOf atropa.Requester#
     * @param {String} method The HTTP method to be used for this request.
     * @param {String} url The URL to send the request to.
     * @param {String} messageBody The body of the request.
     * @param {Object} callback The callback function to execute
     *  when readyState is 4. The callback is supplied with two arguments. The
     *  first argument is a boolean indicating whether or not the http status
     *  was 200. The second argument is the request object.
     * @throws atropa.Requester.makeRequest unexpected argument type
     */
    this.makeRequest = function (method, url, messageBody, callback) {
        var hdr;
        try {
            checkRequest(arguments);
        } catch (e) {
            throw new Error('atropa.Requester.makeRequest unexpected ' +
                'argument type');
        }
        request.aborted = false;
        request.open(method, url, true);
        for (hdr in this.requestHeaders) {
            if (this.requestHeaders.hasOwnProperty(hdr)) {
                request.setRequestHeader(hdr, this.requestHeaders[hdr]);
            }
        }
        
        /**
         * Event listener function for the AJAX request.
         * This is what actually fires the callback supplied
         * to makeRequest.
         * @author <a href="mailto:matthewkastor@gmail.com">
         *  Matthew Christopher Kastor-Inare III </a><br />
         *  ☭ Hial Atropa!! ☭
         * @version 20120909
         * @methodOf atropa.Requester-request
         * @private
         */
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    callback(true, request);
                } else {
                    callback(false, request);
                }
            }
        };
        request.send(messageBody);
        setTimeout(function () {
            if (request.aborted === false) {
                request.abort();
            }
        }, this.timeout);
    };
};




while(atropa.data.requirements.length > 0) {
    atropa.data.requirements.pop()();
}
module.exports = atropa;

},{"atropa-ArgsInfo":11,"atropa-header":12}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRG9jdW1lbnRzXFxHaXRIdWJcXGF0cm9wYS1SZXF1ZXN0ZXJcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLVJlcXVlc3Rlci9kZXYvYnJvd3Nlck1haW4uanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvbm9kZV9tb2R1bGVzL2F0cm9wYS1oZWFkZXIvc3JjL2F0cm9wYS1oZWFkZXIuanMiLCJDOi9Vc2Vycy9rYXN0b3IvRG9jdW1lbnRzL0dpdEh1Yi9hdHJvcGEtUmVxdWVzdGVyL25vZGVfbW9kdWxlcy9hdHJvcGEtQXJnc0luZm8vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL3NyYy9hdHJvcGEtaW5xdWlyZS5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWFycmF5cy9zcmMvYXRyb3BhLWFycmF5cy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9ub2RlX21vZHVsZXMvYXRyb3BhLWN1c3RvbUVycm9ycy9zcmMvYXRyb3BhLWN1c3RvbUVycm9ycy5qcyIsIkM6L1VzZXJzL2thc3Rvci9Eb2N1bWVudHMvR2l0SHViL2F0cm9wYS1SZXF1ZXN0ZXIvbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9zcmMvYXRyb3BhLUFyZ3NJbmZvLmpzIiwiQzovVXNlcnMva2FzdG9yL0RvY3VtZW50cy9HaXRIdWIvYXRyb3BhLVJlcXVlc3Rlci9zcmMvYXRyb3BhLVJlcXVlc3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVxdWVzdGVyID0gcmVxdWlyZSgnLi4vc3JjL2F0cm9wYS1SZXF1ZXN0ZXIuanMnKTtcclxuXHJcbnRyeSB7XHJcbiAgICBPYmplY3Qua2V5cyhSZXF1ZXN0ZXIpLmZvckVhY2goXHJcbiAgICAgICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgaWYoIWF0cm9wYVtwcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgYXRyb3BhW3Byb3BdID0gUmVxdWVzdGVyW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSBjYXRjaCAoaWdub3JlKSB7XHJcbiAgICBhdHJvcGEgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLVJlcXVlc3Rlci5qcycpO1xyXG59XHJcblxyXG5PYmplY3Qua2V5cyhSZXF1ZXN0ZXIuZGF0YSkuZmlsdGVyKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gJ3JlcXVpcmVtZW50cyc7XHJcbiAgICB9XHJcbikuZm9yRWFjaChcclxuICAgIGZ1bmN0aW9uIChwcm9wKSB7XHJcbiAgICAgICAgYXRyb3BhLmRhdGFbcHJvcF0gPSBSZXF1ZXN0ZXIuZGF0YVtwcm9wXTtcclxuICAgIH1cclxuKTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBYUGF0aFJlc3VsdCAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXG4gKi9cbnZhciBhdHJvcGEgPSB7fTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhpcyBjbGFzcyBoYXMgYmVlbiBtYXJrZWQgYXMgdW5zdXBwb3J0ZWQgYW5kIHRocm93cyBhbiBcbiAqICBlcnJvciBpZiBpdCBoYXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAzMDhcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWUgVGhlIG5hbWUgb2YgdGhlIGNsYXNzLlxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yXG4gKi9cbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBjbGFzc05hbWUgPSBTdHJpbmcoY2xhc3NOYW1lKTtcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcbiAgICBlcnJvck1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcbiAgICBcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxufTtcbi8qKlxuICogUHVzaGVzIGEgcmVxdWlyZW1lbnQgY2hlY2sgaW50byBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMuIFRoZSB0ZXN0XG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcbiAqICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdJ3Mgc3VwcG9ydCB0byB1bnN1cHBvcnRlZCBhbmQgZXJyb3IgdG8gZXJyb3JNZXNzYWdlXG4gKiAgaWYgdGhlIHJlcXVpcmVtZW50Rm4gcmV0dXJucyBmYWxzZS4gVGhlIHJlcXVpcmVtZW50IGNoZWNrcyB3aWxsIGFsbCBiZSBydW5cbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMzA4XG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xuICogIGlzIHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50LiBJZiBzdXBwb3J0ZWQsIHJldHVybnMgdHJ1ZSBvdGhlcndpc2VcbiAqICByZXR1cm4gZmFsc2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXG4gKiAgbWV0aG9kcyBhcmUgY2FsbGVkIGluIHVuc3VwcG9ydGVkIGVudmlyb25tZW50cy4gRGVmYXVsdHMgdG86XG4gKiAgJ1RoZSBhdHJvcGEuJyArIGNsYXNzTmFtZSArICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xuICovXG5hdHJvcGEucmVxdWlyZXMgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCByZXF1aXJlbWVudEZuLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gZmFsc2U7XG4gICAgICAgIGlmKHR5cGVvZiBjbGFzc05hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcbiAgICAgICAgICAgICAgICAnc3BlY2lmaWVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9IHt9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0eXBlb2YgcmVxdWlyZW1lbnRGbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50Rm4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSB8fCAnVGhlIGF0cm9wYS4nICsgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJyBjbGFzcyBpcyB1bnN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50Lic7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRlc3QgPSByZXF1aXJlbWVudEZuKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih0ZXN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wdXNoKGNoZWNrKTtcbn07XG4vKipcbiAqIENvbnRhaW5lciBmb3IgZ29iYWwgZGF0YSByZWxhdGVkIHRvIHRoZSBjbGFzc2VzIGFuZCBmdW5jdGlvbnMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxuICovXG5hdHJvcGEuZGF0YSA9IHt9O1xuXG5hdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMgPSBbXTtcblxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIG51bGw7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuLypqc2xpbnRcbiAgICBpbmRlbnQ6IDQsXG4gICAgbWF4ZXJyOiA1MCxcbiAgICB3aGl0ZTogdHJ1ZSxcbiAgICBicm93c2VyOiB0cnVlLFxuICAgIGRldmVsOiB0cnVlLFxuICAgIHBsdXNwbHVzOiB0cnVlLFxuICAgIHJlZ2V4cDogdHJ1ZVxuKi9cbi8qZ2xvYmFsIGF0cm9wYSAqL1xuLy8gZW5kIGhlYWRlclxuXG4vKipcbiAqIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgZnVuY3Rpb25zIHRoYXQgdGVzdCB0aGUgc3RhdGUgb2YgaW5wdXRzLlxuICovXG5hdHJvcGEuaW5xdWlyZSA9IHt9O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgbnVsbC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBudWxsLlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4ID09PSBudWxsLlxuICovXG5hdHJvcGEuaW5xdWlyZS5pc051bGwgPSBmdW5jdGlvbiAoeCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiAoeCA9PT0gbnVsbCk7XG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYW4gb2JqZWN0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGFuIG9iamVjdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgdHlwZW9mKHgpID09PSAnb2JqZWN0Jy5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNPYmplY3QgPSBmdW5jdGlvbiAoeCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiAodHlwZW9mIHggPT09ICdvYmplY3QnKTtcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBib3RoIGFuIG9iamVjdCBhbmQgbm90IG51bGwuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgYm90aCBhblxuICogb2JqZWN0IGFuZCBudWxsLlxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4IGlzIGJvdGggYW4gb2JqZWN0IGFuZFxuICogbm90IG51bGwuIChudWxsIGlzIGFuIG9iamVjdCkuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0KHgpICYmICghYXRyb3BhLmlucXVpcmUuaXNOdWxsKHgpKTtcbn07XG4vKipcbiAqIENoZWNrcyBhbiBvYmplY3QgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9wZXJ0eVxuICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSB3YXMgaW5oZXJpdGVkXG4gKiBvciBub3QuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IHdoaWNoIG1heSBvciBtYXkgbm90XG4gKiBoYXZlIHRoZSBwcm9wZXJ0eSBpZGVudGlmaWVkIGJ5IHByb3AuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBBIHN0cmluZyB2YWx1ZSByZXByZXNlbnRpbmcgdGhlXG4gKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgb2JqLnByb3AgZXhpc3RzLFxuICogb3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gKi9cbmF0cm9wYS5pbnF1aXJlLmhhc1Byb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGlmIChhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwob2JqKSkge1xuICAgICAgICByZXR1cm4gKHByb3AgaW4gb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIGVtcHR5IHN0cmluZy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHlvdSB3YW50IHRvIGtub3cgYWJvdXRcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgc3RyIGlzIGFuIGVtcHR5IHN0cmluZyxcbiAqICBvdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgb3V0ID0gZmFsc2U7XG4gICAgaWYgKCcnID09PSBzdHIpIHtcbiAgICAgICAgb3V0ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn07XG5cblxuXG5cbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xuYXRyb3BhLmlucXVpcmUgPSByZXF1aXJlKCdhdHJvcGEtaW5xdWlyZScpLmlucXVpcmU7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG5cbi8qKlxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAyMjFcbiAqIEBuYW1lc3BhY2UgVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXG4gKi9cbmF0cm9wYS5hcnJheXMgPSB7fTtcbi8qKlxuICogQ29tcGFyZXMgdHdvIGFycmF5cyBiYXNlZCBvbiBzaXplLCBjb250ZW50cywgYW5kIGVsZW1lbnQgb3JkZXIuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMjA5MDlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBPbmUgYXJyYXkgeW91IHdhbnQgY29tcGFyZWQgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBUaGUgb3RoZXIgYXJyYXkuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxuICogIHdoZXRoZXIgb3Igbm90IHRoZSBhcnJheXMgbWF0Y2hlZCBpbiBzaXplLCBjb21wb3NpdGlvbiwgYW5kXG4gKiAgZWxlbWVudCBvcmRlci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDJdO1xuICogdmFyIHkgPSBbMSwxLDNdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyBmYWxzZVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMl07XG4gKiB2YXIgeSA9IFsxLDJdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzIsMV07XG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XG4gKiAvLyByZXR1cm5zIGZhbHNlIGJlY2F1c2UgdGhlIGVsZW1lbnRzIGFyZSBub3QgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XG4gKiB2YXIgeSA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcbiAqIC8vIHJldHVybnMgZmFsc2UgYmVjYXVzZSBldmVuIHRob3VnaCB0aGUgb2JqZWN0IGxvb2tzIHRoZSBzYW1lLCB0aGVcbiAqIC8vIHR3byBvYmplY3RzIGFyZSBpbiBmYWN0IGRpc3RpbmN0IG9iamVjdHMuXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWx1ZSd9O1xuICogdmFyIHggPSBbMSxvYmpdO1xuICogdmFyIHkgPSBbMSxvYmpdO1xuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xuICogLy8gcmV0dXJucyB0cnVlIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZVxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXG4gKi9cbmF0cm9wYS5hcnJheXMubWF0Y2ggPSBmdW5jdGlvbiBhcnJheXNNYXRjaChhcnJheTEsIGFycmF5Mikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciB4LFxuICAgIGw7XG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcbiAgICBmb3IgKHggPSAwOyB4IDwgbDsgeCArPSAxKSB7XG4gICAgICAgIGlmIChhcnJheTFbeF0gIT09IGFycmF5Mlt4XSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxuICogIHNldHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGZyb21CIChtaW51ZW5kKSBUaGUgYXJyYXkgd2l0aCBlbGVtZW50cyBkdXBsaWNhdGVkIGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwyXTtcbiAqIHZhciB5ID0gWzEsMSwzXTtcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcbiAqIC8vIHJldHVybnMgWzNdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMV07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzXTtcbiAqIHZhciB5ID0gWzMsMSwxLDldO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbOV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ307XG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFtdIFxuICogLy8gYmVjYXVzZSB0aGUgb2JqZWN0cyByZWZlcmVuY2VkIGluIHRoZSBhcnJheXMgYXJlIHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCA9IGZ1bmN0aW9uKGEsIGZyb21CKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIHRoZSA9IHt9O1xuICAgIHRoZS5yZXN1bHQgPSBbXTtcbiAgICBmcm9tQi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xuICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24ocm0pe1xuICAgICAgICAgICAgaWYoaXRlbSA9PT0gcm0pIHtcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhlLnJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoZS5yZXN1bHQ7XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlbiBhcnJheXMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMTJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MiBBbm90aGVyIGFycmF5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBmb3VuZCBpbiBib3RoIG9mIHRoZSBnaXZlblxuICogIGFycmF5cy5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDMsNF07XG4gKiB2YXIgeSA9IFszLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMSwzLDRdO1xuICogdmFyIHkgPSBbMywxLDEsNV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwxLDNdXG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciB4ID0gWzEsMyxvYmpdO1xuICogdmFyIHkgPSBbMywxLG9ial07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV1cbiAqIEBleGFtcGxlXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiB2YXIgeSA9IFszLDEsb2JqXTtcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XG4gKiAvLyByZXR1cm5zIFsxLDNdIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cbiAqL1xuYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QgPSBmdW5jdGlvbiBpbnRlcnNlY3QoYXJyYXkxLCBhcnJheTIpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICB2YXIgc21hbGxBcnJheSwgbGFyZ2VBcnJheSwgaW50ZXJzZWN0aW9uID0gW107XG4gICAgaWYoYXJyYXkxLmxlbmd0aCA+IGFycmF5Mi5sZW5ndGgpIHtcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xuICAgICAgICBzbWFsbEFycmF5ID0gYXJyYXkxLnNwbGljZSgwKTtcbiAgICB9XG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBpZHhJbkxhcmdlQXJyYXkgPSBsYXJnZUFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmICgwIDw9IGlkeEluTGFyZ2VBcnJheSkgeyAvLyBoYXMgd29yZFxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xufTtcbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDExOFxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB0byBjYWxjdWxhdGUgZnJlcXVlbmNpZXMgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXG4gKiAgZWxlbWVudHMgZnJvbSB0aGUgYXJyYXkgYW5kIHRoZWlyIHZhbHVlIGlzIHRoZWlyIGZyZXF1ZW5jeSBvZlxuICogIG9jY3VycmVuY2Ugd2l0aGluIHRoZSBhcnJheS4gQmUgY2FyZWZ1bCB0aGF0IHlvdXIgYXJyYXkgZG9lc1xuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwxLDEsMSwxLDMsM107XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiA1LFxuICogLy8gICAgIFwiM1wiOiAyXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcImJpbGxcIjogMSxcbiAqIC8vICAgICBcImZyZWRcIjogMixcbiAqIC8vICAgICBcImphbmVcIjogMVxuICogLy8gfVxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAxXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcbiAqIHZhciBvdGhlck9iaiA9IHt9O1xuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XG4gKiAvLyByZXR1cm5zIHtcbiAqIC8vICAgICBcIjFcIjogMSxcbiAqIC8vICAgICBcIjNcIjogMSxcbiAqIC8vICAgICBcIltvYmplY3QgT2JqZWN0XVwiOiAzXG4gKiAvLyB9XG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMSwzLFwidG9TdHJpbmdcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcbiAqIC8vIHJldHVybnMge1xuICogLy8gICAgIFwiMVwiOiAxLFxuICogLy8gICAgIFwiM1wiOiAxLFxuICogLy8gICAgIFwidG9TdHJpbmdcIjogXCJmdW5jdGlvbiB0b1N0cmluZygpIHtcXG4gICAgW25hdGl2ZSBjb2RlXVxcbn0xXCJcbiAqIC8vIH1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3kgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xuICAgICAgICBpZiAoYWNjW2N1cnJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGFjY1tjdXJyXSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2NbY3Vycl0gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gb3V0O1xufTtcbi8qKlxuICogR2V0cyBVbmlxdWUgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHZlcnNpb24gMjAxMzAxMThcbiAqIEBwYXJhbSB7QXJyYXl9IGxhcmdlQXJyYXkgVGhlIGFycmF5IHdpdGggZHVwbGljYXRlIHZhbHVlcyBpbiBpdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBjb250YWluaW5nIG9ubHkgdGhlIHVuaXF1ZVxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFsxLDEsMSw0LDQsMyw2XTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiMVwiLCBcIjRcIiwgXCIzXCIsIFwiNlwiIF1cbiAqIEBleGFtcGxlXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XG4gKiBhdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSh4KTtcbiAqIC8vIHJldHVybnMgW1wiYmlsbFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIFxuICogICAgIFwiYmlsbFwiLFxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcbiAqICAgICB7XCJhR3V5XCIgOiBcImZyZWRcIn0sXG4gKiAgICAge1wiYUxhZHlcIiA6IFwiamFuZVwifVxuICogXTtcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xuICogLy8gcmV0dXJucyBbIFwiYmlsbFwiLCBcIltvYmplY3QgT2JqZWN0XVwiIF1cbiAqL1xuYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUgPSBmdW5jdGlvbiAobGFyZ2VBcnJheSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xufTtcbi8qKlxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVdpdGhFbXB0eUVsZW1lbnRzIFRoZSBhcnJheSB3aXRoIGVtcHR5IHN0cmluZ3MgaW4gaXQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbIDEwLCAsIDUsIFwiXCIsICcnLCA3IF07XG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XG4gKiBjb25zb2xlLmxvZyh4KTtcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlbW92ZUVtcHR5RWxlbWVudHMoeCk7XG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xuICogY29uc29sZS5sb2coeCk7XG4gKiAvLyBkaXNwbGF5cyB0aGUgZm9sbG93aW5nXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxuICogLy8gWzEwLCB1bmRlZmluZWQsIDUsIFwiXCIsIFwiXCIsIDddXG4gKiAvLyBlbmRpbmcgbGVuZ3RoIDNcbiAqIC8vIFsxMCwgNSwgN11cbiAqL1xuYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzID0gZnVuY3Rpb24gKGFycmF5V2l0aEVtcHR5RWxlbWVudHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXR1cm4gYXJyYXlXaXRoRW1wdHlFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuICFhdHJvcGEuaW5xdWlyZS5pc0VtcHR5U3RyaW5nKGl0ZW0pO1xuICAgIH0pO1xufTtcbi8qKlxuICogUmVpbmRleGVzIGFuIGFycmF5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHdpdGggZGlzY29udGludW91cyBrZXlzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxuICogQGV4YW1wbGVcbiAqIHZhciB4ID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCB1bmRlZmluZWQgXTtcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcbiAqIFxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcbiAqICAgICAgICAgICAgICAvLyB0aGUgYXJyYXkgbGVuZ3RoIHJlbWFpbnMgdGhlIHNhbWVcbiAqICAgICAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSBhcnJheXMga2V5cyBhcmUgMCwgMiwgYW5kIDNcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogY29uc29sZS5sb2coeC5sZW5ndGgpOyAvLyA0XG4gKiBcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XG4gKiBjb25zb2xlLmxvZyh4KTsgLy8gIFsgXCJhXCIsIFwiY1wiLCB1bmRlZmluZWQgXVxuICogICAgLy8gbm90ZSB0aGF0IHRoZSBsYXN0IGVsZW1lbnQgZXhpc3RlZCBpbiB0aGUgYXJyYXksIGl0cyB2YWx1ZSB3YXNcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXG4gKiAgICAvL1xuICogICAgLy8gVGhlIGRlbGV0ZWQgZWxlbWVudCB3YXMgaW4gZmFjdCBkZWxldGVkIGZyb20gdGhlIGFycmF5IHNvIHRoZXJlIHdhcyBub1xuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcbiAqICAgIC8vIHZhbHVlIG9mIHVuZGVmaW5lZCB3YXMgcmV0dXJuZWQuIFRoaXMgYmVoYXZpb3IgaXMgY29uZnVzaW5nIHVubGVzcyB5b3VcbiAqICAgIC8vIHRoaW5rIGFib3V0IHRoZSBhcnJheWFzIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBuYW1lZCBieVxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXG4gKiAgICAvLyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdGVkIGluIHRoZSBwYXN0IG9yIG5vdC5cbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gM1xuICovXG5hdHJvcGEuYXJyYXlzLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KGFycikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBpZHgsIG91dDtcbiAgICBvdXQgPSBbXTtcbiAgICBmb3IoaWR4IGluIGFycikge1xuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgb3V0LnB1c2goYXJyW2lkeF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59O1xuLyoqXG4gKiBTb3J0cyBhbiBhcnJheSdzIGVsZW1lbnRzIG51bWVyaWNhbGx5LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMTIwXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxuICogIG51bWJlci1pc2guXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgd2hvc2UgZWxlbWVudHMgYXJlIGluIG51bWVyaWMgb3JkZXIuXG4gKiBAZXhhbXBsZVxuICogdmFyIHggPSBbMywgMiwgOSwgMjYsIDEwLCAxLCA5OSwgMTVdO1xuICogY29uc29sZS5sb2coIGF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5KHgpICk7XG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0TnVtZXJpY2FsbHkgPSBmdW5jdGlvbiBzb3J0TnVtZXJpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSAtIGIpO1xuICAgIH0pO1xufTtcbi8qKlxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcbiAqICBzdGFuZGFyZGl6ZWQuXG4gKiBcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcbiAqICBjb21wYXJpc29uIGlzIGltcGxlbWVudGF0aW9uIGRlcGVuZGFudC4gVGhpcyBtZWFucyB0aGF0IFwiYWxwaGFiZXRpY2FsIG9yZGVyXCJcbiAqICBjYW4gYmUgZGlmZmVyZW50IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMuIFdoYXQgSSBmb3VuZCB3YXMgdGhhdCBpbiBub2RlIHRoZVxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cbiAqICA8Y29kZT5bJ0EnLCdaJywnYScsJ3pcIl08L2NvZGU+LCB3aGlsZSBvblxuICogIGZpcmVmb3ggaXQgd291bGQgYmUgc29ydGVkIHRvIDxjb2RlPlsnYScsJ0EnLCd6JywnWiddPC9jb2RlPi4gV2hvIGtub3dzIGlmXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cbiAqIFxuICogSW4gb3JkZXIgdG8gcHJvdmlkZSBhIHJlbGlhYmxlIGltcGxlbWVudGF0aW9uIEkgd291bGQgaGF2ZSB0byBjcmVhdGUgbXkgb3duXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXG4gKiAganVzdCB0b28gbXVjaCB3b3JrIGZvciBtZSB0byBkbyBhbG9uZS5cbiAqIEB0aHJvd3Mge0Vycm9yfSBcIlN0cmluZy5wcm90b3R5cGUubG9jYWxlQ29tcGFyZSBpcyBub3Qgc3RhbmRhcmRpemVkXCJcbiAqL1xuYXRyb3BhLmFycmF5cy5zb3J0QWxwaGFiZXRpY2FsbHkgPSBmdW5jdGlvbiBzb3J0QWxwaGFiZXRpY2FsbHkoYXJyKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XG59O1xuLyoqXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XG4gKiAgZG9lcyB3aGF0IHlvdSB3b3VsZCBleHBlY3QgdGhlIGRlbGV0ZSBvcGVyYXRvciB0byBkbywgZXhjZXB0IHRoZSBkZWxldGVcbiAqICBvcGVyYXRvciBkb2Vzbid0IGRvIHdoYXQgeW91IHdvdWxkIGV4cGVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZS5cbiAqIEByZXR1cm5zIFJldHVybnMgYW4gYXJyYXkgd2l0aCB0aGUgZWxlbWVudCByZW1vdmVkLCBjb250aWd1b3VzIGtleXMsIGFuZFxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXG4gKi9cbmF0cm9wYS5hcnJheXMuZGVsZXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhcnIsIGluZGV4KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZGVsZXRlIGFycltpbmRleF07XG4gICAgcmV0dXJuIGF0cm9wYS5hcnJheXMucmVpbmRleChhcnIpO1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XG4vKmpzbGludFxuICAgIGluZGVudDogNCxcbiAgICBtYXhlcnI6IDUwLFxuICAgIHdoaXRlOiB0cnVlLFxuICAgIGJyb3dzZXI6IHRydWUsXG4gICAgZGV2ZWw6IHRydWUsXG4gICAgcGx1c3BsdXM6IHRydWUsXG4gICAgcmVnZXhwOiB0cnVlXG4qL1xuLypnbG9iYWwgYXRyb3BhICovXG4vLyBlbmQgaGVhZGVyXG4vKipcbiAqIENvbnRhaW5lciBmb3IgY3VzdG9tIEVycm9ycy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgY3VzdG9tIEVycm9ycy5cbiAqL1xuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHt9O1xuXG4vKipcbiAqIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxuICogQGNsYXNzIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE9wdGlvbmFsLiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLiBEZWZhdWx0cyB0b1xuICogIDxjb2RlPkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3I8L2NvZGU+XG4gKiBAcmV0dXJucyB7RXJyb3J9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgdGhlIEludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcbiAqL1xuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yID0gZnVuY3Rpb24gSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihtZXNzYWdlKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci4gVGVsbHMgdGhlIHVzZXIgd2hhdCBraW5kIG9mIGN1c3RvbVxuICAgICAqIGVycm9yIGhhcyBiZWVuIHRocm93bi5cbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gXCJhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcbiAgICAvKipcbiAgICAgKiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLlxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvciNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXG4gICAgICovXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBcIkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIjtcbn07XG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gXG4gICAgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yO1xuXG5cblxuXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xuYXRyb3BhLmFycmF5cyA9IHJlcXVpcmUoJ2F0cm9wYS1hcnJheXMnKS5hcnJheXM7XG5hdHJvcGEuY3VzdG9tRXJyb3JzID0gcmVxdWlyZSgnYXRyb3BhLWN1c3RvbUVycm9ycycpLmN1c3RvbUVycm9ycztcbi8qanNsaW50XG4gICAgaW5kZW50OiA0LFxuICAgIG1heGVycjogNTAsXG4gICAgd2hpdGU6IHRydWUsXG4gICAgYnJvd3NlcjogdHJ1ZSxcbiAgICBkZXZlbDogdHJ1ZSxcbiAgICBwbHVzcGx1czogdHJ1ZSxcbiAgICByZWdleHA6IHRydWVcbiovXG4vKmdsb2JhbCBhdHJvcGEgKi9cbi8vIGVuZCBoZWFkZXJcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgYSBmaWx0ZXIgZm9yIGFyZ3VtZW50cyBiYXNlZCBvbiB0eXBlLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cbiAqIEByZXR1cm5zIHtBcmdzSW5mb30gUmV0dXJucyBhbiBBcmdzSW5mbyBmaWx0ZXIuXG4gKiBAcmVxdWlyZXMgYXRyb3BhLmFycmF5cy5tYXRjaFxuICogQGV4YW1wbGVcbiAqIGZ1bmN0aW9uIG15Q2xhc3N5Q29uc3RydWN0b3IodGFrZXMsIGEsIGZldywgYXJncykge1xuICogICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLCBjaGVja2VyO1xuICogICAgIFxuICogICAgIGV4cGVjdGVkQXJnVHlwZXMgPSB7fTtcbiAqICAgICBleHBlY3RlZEFyZ1R5cGVzLnJlcXVlc3RXaXRoTWVzc2FnZSA9IFxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xuICogICAgIGV4cGVjdGVkQXJnVHlwZXMucmVxdWVzdE51bGxNZXNzYWdlID0gXG4gKiAgICAgICAgICBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XG4gKiAgICAgXG4gKiAgICAgY2hlY2tlciA9IG5ldyBhdHJvcGEuQXJnc0luZm8oKTtcbiAqICAgICBjaGVja2VyLnNldEV4cGVjdGVkQXJnVHlwZXMoZXhwZWN0ZWRBcmdUeXBlcyk7XG4gKiAgICAgXG4gKiAgICAgdHJ5IHtcbiAqICAgICBcbiAqICAgICAgICAgLy8gQ2hlY2sgdGhlIHN1cHBsaWVkIGFyZ3VtZW50cyBwc2V1ZG8gYXJyYXkncyBhcmd1bWVudCB0eXBlc1xuICogICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBvZiB0eXBlcyBpbiBhcmd1bWVudHMgbWF0Y2hlcyBvbmUgb2YgdGhlXG4gKiAgICAgICAgIC8vIHBhdHRlcm5zIHNldCBvbiBleHBlY3RlZEFyZ1R5cGVzIHRoZW4gdGhlIG1hdGNoaW5nIHBhdHRlcm5cbiAqICAgICAgICAgLy8gd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqICAgICAgICAgXG4gKiAgICAgICAgIGNoZWNrZXIuY2hlY2tBcmdUeXBlcyhhcmd1bWVudHMpO1xuICogICAgIH0gY2F0Y2ggKGUpIHtcbiAqICAgICBcbiAqICAgICAgICAgLy8gSW52YWxpZCBhcmd1bWVudCB0eXBlcyBzdXBwbGllZC4gSGFuZGxlXG4gKiAgICAgICAgIC8vIHRoZSBlcnJvciBvciBiYWlsLlxuICogICAgICAgICBcbiAqICAgICB9XG4gKiAgICAgXG4gKiAgICAgLy8gdGhlIGFyZ3VtZW50cyBzdXBwbGllZCB3aWxsIGJlIG9mIHRoZSBwcm9wZXIgdHlwZVxuICogICAgIC8vIHlvdXIgZnVuY3Rpb24gY2FuIGdvIGFoZWFkIGFuZCBkbyB0aGluZ3Mgd2l0aCB0aGVtXG4gKiB9XG4gKi9cbmF0cm9wYS5BcmdzSW5mbyA9IGZ1bmN0aW9uIEFyZ3NJbmZvKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcyxcbiAgICBjaGVja0FyZ3MsXG4gICAgdGhhdDtcbiAgICAvKipcbiAgICAgKiBIb2xkcyB0aGUgcHJvcGVyIHJlZmVyZW5jZSB0byA8Y29kZT50aGlzPC9jb2RlPlxuICAgICAqIGZvciBwcml2YXRlIGZ1bmN0aW9ucy5cbiAgICAgKiBAdHlwZSBUaGlzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXG4gICAgICovXG4gICAgdGhhdCA9IHRoaXM7XG4gICAgLyoqXG4gICAgICogSG9sZHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzIG9iamVjdC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKi9cbiAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMuXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcbiAgICAgKiBAcGFyYW0ge0V4cGVjdGVkIEFyZyBUeXBlc30gdHlwZXNPYmogQW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb25cbiAgICAgKiAgYWJvdXQgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyB5b3UgZXhwZWN0LiBTcGVjaWZpY2FsbHksIHRoZSBvYmplY3Qgc2hvdWxkXG4gICAgICogIGxvb2sgbGlrZSB0aGUgZXhhbXBsZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHR5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxuICAgICAqIFxuICAgICAqIHZhciB0eXBlc09iaiA9IHtcbiAgICAgKiAgICAgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sXG4gICAgICogICAgIFwibmFtZWRBbHRlcm5hdGVBcmd1bWVudFR5cGVzQXJyYXlcIiA6IFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdXG4gICAgICogfTtcbiAgICAgKiBcbiAgICAgKiAvLyBZb3UgbWF5IHVzZSBhcyBtYW55IG5hbWVkIGFycmF5cyBhcyB5b3Ugd2lzaCBhbmQgY2hlY2tBcmdUeXBlcyB3aWxsXG4gICAgICogLy8gdGVzdCBmb3IgYSBtYXRjaCB0byBhdCBsZWFzdCBvbmUgb2YgdGhlIHByb3ZpZGVkIG5hbWVkIGFycmF5cy5cbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVcbiAgICAgKiAgdHlwZXNPYmogY2FuIG5vdCBiZSB1c2VkIHRvIHNldCB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMuXG4gICAgICovXG4gICAgdGhpcy5zZXRFeHBlY3RlZEFyZ1R5cGVzID0gZnVuY3Rpb24gc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikge1xuICAgICAgICB2YXIgZXJyb3IsIG5hbWVzO1xuICAgICAgICBcbiAgICAgICAgZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIGlmKGF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCh0eXBlc09iaikpIHtcbiAgICAgICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModHlwZXNPYmopO1xuICAgICAgICAgICAgaWYgKG5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBleHBlY3RlZEFyZ1R5cGVzID0gdHlwZXNPYmo7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXG4gICAgICAgICAgICAgICAgJ3R5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOiB2YXIgdHlwZXNPYmogPSAnICtcbiAgICAgICAgICAgICAgICAneyBcIm5hbWVkQXJndW1lbnRUeXBlc0FycmF5XCIgOiAnICtcbiAgICAgICAgICAgICAgICAnICAgIFtcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdLCAnICtcbiAgICAgICAgICAgICAgICAnXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXG4gICAgICAgICAgICAgICAgJyAgIFtcIm9iamVjdFwiLCBcImZ1bmN0aW9uXCIsIFwibnVtYmVyXCJdIH07ICcgK1xuICAgICAgICAgICAgICAgICdZb3UgbWF5IHVzZSBhcyBtYW55IG5hbWVkIGFycmF5cyBhcyB5b3Ugd2lzaCBhbmQnICtcbiAgICAgICAgICAgICAgICAnY2hlY2tBcmdUeXBlcyB3aWxsIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSAnICtcbiAgICAgICAgICAgICAgICAncHJvdmlkZWQgbmFtZWQgYXJyYXlzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3QsIG9yIGFueXRoaW5nIHlvdSB3YW50IHRvXG4gICAgICogY2hlY2sgdGhlIHR5cGUgb2YuXG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIHRoZSB0eXBlcyBvZiBhcmd1bWVudHMgcGFzc2VkIGluLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0QXJnVHlwZXMgPSBmdW5jdGlvbiBnZXRBcmdUeXBlcyhhcmdzKSB7XG4gICAgICAgIHZhciB4LFxuICAgICAgICBhcmdUeXBlcztcbiAgICAgICAgYXJnVHlwZXMgPSBbXTtcbiAgICAgICAgZm9yICh4IGluIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHgpKSB7XG4gICAgICAgICAgICAgICAgYXJnVHlwZXMucHVzaCh0eXBlb2YoYXJnc1t4XSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcmdUeXBlcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHRoZSBleHBlY3RlZCBhcmd1bWVudHMgdHlwZXMgdG8gdGhlXG4gICAgICogcmVjZWl2ZWQgYXJndW1lbnRzIHR5cGVzLlxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mby1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBleHBlY3RlZFR5cGVzQXJyYXkgQW4gYXJyYXkgdGFrZW4gZnJvbSB0aGUgdXNlclxuICAgICAqIGNyZWF0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIGFuIGFyZ3VtZW50cyBvYmplY3QuXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwZWN0ZWQgdHlwZXMgbWF0Y2ggZm9yIHR5cGVcbiAgICAgKiAgYW5kIGFyZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgcmVjZWl2ZWQgdHlwZXMuXG4gICAgICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcbiAgICAgKi9cbiAgICBjaGVja0FyZ3MgPSBmdW5jdGlvbiBjaGVja0FyZ3MoZXhwZWN0ZWRUeXBlc0FycmF5LCBhcmdzKSB7XG4gICAgICAgIHZhciB0eXBlcztcbiAgICAgICAgdHlwZXMgPSB7fTtcbiAgICAgICAgdHlwZXMuZXhwZWN0ZWQgPSBleHBlY3RlZFR5cGVzQXJyYXk7XG4gICAgICAgIHR5cGVzLnJlY2VpdmVkID0gdGhhdC5nZXRBcmdUeXBlcyhhcmdzKTtcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5hcnJheXMubWF0Y2godHlwZXMuZXhwZWN0ZWQsIHR5cGVzLnJlY2VpdmVkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgZ2l2ZW4gYXJndW1lbnRzIG9iamVjdCBhZ2FpbnN0IHRoZSBleHBlY3RlZFxuICAgICAqIGFyZ3VtZW50cyB0eXBlcy5cbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgdXNlciBhc3NpZ25lZCBrZXkgd2hpY2ggbWF0Y2hlcyB0aGVcbiAgICAgKiBhcmd1bWVudHMgc3VwcGxpZWQsIG9yIHRocm93cyBhbiBlcnJvci5cbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBubyBtYXRjaGluZ1xuICAgICAqICBwYXR0ZXJuIG9mIGFyZ3VtZW50IHR5cGVzIGNhbiBiZSBmb3VuZCBmb3IgPGNvZGU+YXJnczwvY29kZT5cbiAgICAgKiBAc2VlIGF0cm9wYS5BcmdzSW5mbyNzZXRFeHBlY3RlZEFyZ1R5cGVzXG4gICAgICovXG4gICAgdGhpcy5jaGVja0FyZ1R5cGVzID0gZnVuY3Rpb24gY2hlY2tBcmdUeXBlcyhhcmdzKSB7XG4gICAgICAgIHZhciBleHBlY3RlZFR5cGVzO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZXhwZWN0ZWRBcmdUeXBlcykubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IGF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcihcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgaXMgbm90IHNldC4gVXNlICcgK1xuICAgICAgICAgICAgICAgICdzZXRFeHBlY3RlZEFyZ1R5cGVzKHR5cGVzT2JqKSB0byBzZXQuIHR5cGVzT2JqIGlzIGFuICcgK1xuICAgICAgICAgICAgICAgICdvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgYXJyYXlzIG9mIHN0cmluZ3MgcmVwcmVzZW50aW5nICcgK1xuICAgICAgICAgICAgICAgICd0aGUgdHlwZW9mKGFyZ3VtZW50KSBmb3IgZWFjaCBhcmd1bWVudCwgaW4gdGhlIGV4YWN0IG9yZGVyICcgK1xuICAgICAgICAgICAgICAgICdpbiB3aGljaCB0aGV5IHdpbGwgYmUgZ2l2ZW4gdG8gdGhlIGZ1bmN0aW9uLiBVc2luZyBtdWx0aXBsZSAnICtcbiAgICAgICAgICAgICAgICAncHJvcGVydGllcyBpdCBpcyBwb3NzaWJsZSB0byBkZWZpbmUgYWx0ZXJuYXRpdmUgYWNjZXB0YWJsZSAnICtcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZSBzZXRzLiBVc2UgZ2V0QXJnVHlwZXMoYXJndW1lbnRzKSBhcyBhICcgK1xuICAgICAgICAgICAgICAgICdjb252ZW5pZW50IHdheSBvZiBnZXR0aW5nIHRoZSBhcnJheSB5b3Ugd2FudCB0byBoYXJkIGNvZGUgJyArXG4gICAgICAgICAgICAgICAgJ2luIGZvciB2YWxpZGF0aW9uLiBFeGFtcGxlOiB2YXIgdHlwZXNPYmogPSAnICtcbiAgICAgICAgICAgICAgICAneyBcIm1lc3NhZ2VJbmNsdWRlZFwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xuICAgICAgICAgICAgICAgICdcIm1lc3NhZ2VOb3RJbmNsdWRlZFwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoZXhwZWN0ZWRUeXBlcyBpbiBleHBlY3RlZEFyZ1R5cGVzKSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRBcmdUeXBlcy5oYXNPd25Qcm9wZXJ0eShleHBlY3RlZFR5cGVzKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja0FyZ3MoZXhwZWN0ZWRBcmdUeXBlc1tleHBlY3RlZFR5cGVzXSwgYXJncykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkVHlwZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXG4gICAgICAgICAgICAnaW52YWxpZCBhcmd1bWVudCB0eXBlIEAgYXRyb3BhLkFyZ3NJbmZvLmNoZWNrQXJnVHlwZXMnKTtcbiAgICB9O1xufTtcblxuXG5cblxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuYXRyb3BhLkFyZ3NJbmZvID0gcmVxdWlyZSgnYXRyb3BhLUFyZ3NJbmZvJykuQXJnc0luZm87XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICdSZXF1ZXN0ZXInLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuQXJnc0luZm8sXHJcbiAgICAgICAgICAgICAgICBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHJlcHJlc2VudHMgYW4gWE1MSHR0cFJlcXVlc3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxyXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGFuIFhNTEh0dHBSZXF1ZXN0LlxyXG4gKiBAcmV0dXJucyB7UmVxdWVzdGVyfSBSZXR1cm5zIGEgcmVxdWVzdGVyIG9iamVjdC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciByZXF1ZXN0ZXIsIGZvcm1EYXRhO1xyXG4gKiBcclxuICogcmVxdWVzdGVyID0gbmV3IGF0cm9wYS5SZXF1ZXN0ZXIoKTtcclxuICogcmVxdWVzdGVyLnRpbWVvdXQgPSAxMDAwMDsgLy8gcmVxdWVzdHMgd2lsbCBhYm9ydCBhZnRlciAxMCBzZWNvbmRzLlxyXG4gKiByZXF1ZXN0ZXIucmVxdWVzdEhlYWRlcnMgPSB7XHJcbiAqICAgICBcImFIZWFkZXJcIiA6IFwiaGVhZGVyVmFsdWVcIixcclxuICogICAgIFwiYW5vdGhlckhlYWRlclwiIDogXCJhbmRWYWx1ZVwiXHJcbiAqIH07XHJcbiAqIFxyXG4gKiBmdW5jdGlvbiBzaG93UmVxdWVzdFJlc3VsdHMoc3RhdHVzLCByZXF1ZXN0KSB7XHJcbiAqICAgICBjb25zb2xlLmxvZyhcIlN0YXR1czogJyArIHN0YXR1cyk7XHJcbiAqICAgICBjb25zb2xlLmRpcihyZXF1ZXN0KTsgLy8gY29uc29sZSBkaXIgbWF5IG9yIG1heSBub3RcclxuICogICAgICAgICAgICAgICAgICAgICAgICAvLyBiZSBzdXBwb3J0ZWQgaW4geW91ciBlbnZpcm9ubWVudC5cclxuICogfVxyXG4gKiBcclxuICogZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICogZm9ybURhdGEuYXBwZW5kKCdhRm9ybUZpZWxkTmFtZScsICdmb3JtRmllbGREYXRhJyk7XHJcbiAqIGZvcm1EYXRhLmFwcGVuZCgnYW5vdGhlckZvcm1GaWVsZE5hbWUnLCAnYW5kRGF0YScpO1xyXG4gKiBcclxuICogcmVxdWVzdGVyLm1ha2VSZXF1ZXN0KFxyXG4gKiAgICAgXCJwb3N0XCIsIFwiaHR0cDovL2V4YW1wbGUuY29tXCIsIGZvcm1EYXRhLCBzaG93UmVxdWVzdFJlc3VsdHMpO1xyXG4gKi9cclxuYXRyb3BhLlJlcXVlc3RlciA9IGZ1bmN0aW9uIFJlcXVlc3RlcigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnN1cHBvcnRDaGVjaygnUmVxdWVzdGVyJyk7XHJcbiAgICB2YXIgZXhwQXJnVHlwZXMsXHJcbiAgICAgICAgY2hlY2tSZXF1ZXN0LFxyXG4gICAgICAgIHJlcXVlc3Q7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQ29udGFpbmVyIG9iamVjdCBmb3IgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzXHJcbiAgICAgKiBzdXBwbGllZCB0byB0aGlzLm1ha2VSZXF1ZXN0LlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3Rlci1cclxuICAgICAqL1xyXG4gICAgZXhwQXJnVHlwZXMgPSB7fTtcclxuICAgIGV4cEFyZ1R5cGVzLnJlcXVlc3RXaXRoTWVzc2FnZSA9IFsnc3RyaW5nJywgJ3N0cmluZycsICdzdHJpbmcnLCAnZnVuY3Rpb24nXTtcclxuICAgIGV4cEFyZ1R5cGVzLnJlcXVlc3ROdWxsTWVzc2FnZSA9IFsnc3RyaW5nJywgJ3N0cmluZycsICdvYmplY3QnLCAnZnVuY3Rpb24nXTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIGNoZWNrIHRoZSBhcmd1bWVudHMgdHlwZXMgc3VwcGxpZWQgdG8gdGhpcy5tYWtlUmVxdWVzdC5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyLVxyXG4gICAgICogQHBhcmFtIHtBcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIGFycmF5XHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGFyZ3MgdHlwZXMgbWF0Y2ggdGhlXHJcbiAgICAgKiBleHBlY3RlZCB0eXBlcy5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuQXJnc0luZm8jY2hlY2tBcmdUeXBlc1xyXG4gICAgICovXHJcbiAgICBjaGVja1JlcXVlc3QgPSBmdW5jdGlvbiAoYXJncykge1xyXG4gICAgICAgIHZhciBjaGVja2VyO1xyXG4gICAgICAgIGNoZWNrZXIgPSBuZXcgYXRyb3BhLkFyZ3NJbmZvKCk7XHJcbiAgICAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cEFyZ1R5cGVzKTtcclxuICAgICAgICByZXR1cm4gY2hlY2tlci5jaGVja0FyZ1R5cGVzKGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBPYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhbmQgdmFsdWVzIGFyZSBoZWFkZXIgbmFtZXMgYW5kIHZhbHVlc1xyXG4gICAgICogIHJlc3BlY3RpdmVseS5cclxuICAgICAqIEB0eXBlIE9iamVjdFxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXF1ZXN0SGVhZGVycyA9IHt9O1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB0aW1lb3V0IHZhbHVlIGZvciB0aGUgcmVxdWVzdCBpbiBtaWxsaXNlY29uZHMuIFRoZSByZXF1ZXN0IHdpbGxcclxuICAgICAqICBhYm9ydCBhZnRlciB0aGlzIGFtb3VudCBvZiB0aW1lIGhhcyBwYXNzZWQuXHJcbiAgICAgKiBAdHlwZSBOdW1iZXJcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXIjXHJcbiAgICAgKi9cclxuICAgIHRoaXMudGltZW91dCA9IDMwMDAwO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFhNTEh0dHBSZXF1ZXN0IG9iamVjdCB1c2VkIGJ5IFJlcXVlc3Rlci5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3Rlci1cclxuICAgICAqL1xyXG4gICAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5hYm9ydGVkID0gZmFsc2U7XHJcbiAgICByZXF1ZXN0LmFib3J0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmVxdWVzdC5hYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgICBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQuY2FsbCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogTWFrZXMgYW4gQUpBWCByZXF1ZXN0LlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTMwMzExXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3RlciNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgVGhlIEhUVFAgbWV0aG9kIHRvIGJlIHVzZWQgZm9yIHRoaXMgcmVxdWVzdC5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBzZW5kIHRoZSByZXF1ZXN0IHRvLlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VCb2R5IFRoZSBib2R5IG9mIHRoZSByZXF1ZXN0LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNhbGxiYWNrIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlXHJcbiAgICAgKiAgd2hlbiByZWFkeVN0YXRlIGlzIDQuIFRoZSBjYWxsYmFjayBpcyBzdXBwbGllZCB3aXRoIHR3byBhcmd1bWVudHMuIFRoZVxyXG4gICAgICogIGZpcnN0IGFyZ3VtZW50IGlzIGEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgb3Igbm90IHRoZSBodHRwIHN0YXR1c1xyXG4gICAgICogIHdhcyAyMDAuIFRoZSBzZWNvbmQgYXJndW1lbnQgaXMgdGhlIHJlcXVlc3Qgb2JqZWN0LlxyXG4gICAgICogQHRocm93cyBhdHJvcGEuUmVxdWVzdGVyLm1ha2VSZXF1ZXN0IHVuZXhwZWN0ZWQgYXJndW1lbnQgdHlwZVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1ha2VSZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBtZXNzYWdlQm9keSwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgaGRyO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNoZWNrUmVxdWVzdChhcmd1bWVudHMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhdHJvcGEuUmVxdWVzdGVyLm1ha2VSZXF1ZXN0IHVuZXhwZWN0ZWQgJyArXHJcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LmFib3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIGZvciAoaGRyIGluIHRoaXMucmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdEhlYWRlcnMuaGFzT3duUHJvcGVydHkoaGRyKSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGhkciwgdGhpcy5yZXF1ZXN0SGVhZGVyc1toZHJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFdmVudCBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIEFKQVggcmVxdWVzdC5cclxuICAgICAgICAgKiBUaGlzIGlzIHdoYXQgYWN0dWFsbHkgZmlyZXMgdGhlIGNhbGxiYWNrIHN1cHBsaWVkXHJcbiAgICAgICAgICogdG8gbWFrZVJlcXVlc3QuXHJcbiAgICAgICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgICAgICogQG1ldGhvZE9mIGF0cm9wYS5SZXF1ZXN0ZXItcmVxdWVzdFxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZhbHNlLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKG1lc3NhZ2VCb2R5KTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QuYWJvcnRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMudGltZW91dCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iXX0=
