;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-inquire/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-inquire/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-inquire/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.inquire = require('atropa-inquire').inquire;
/**
 * Required module, the docs for it are in the <code>
 *  atropa-arrays/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-arrays/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-arrays/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.arrays = require('atropa-arrays').arrays;
/**
 * Required module, the docs for it are in the <code>
 *  atropa-customErrors/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-customErrors/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-customErrors/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.customErrors = require('atropa-customErrors').customErrors;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.ArgsInfo">tests</a>
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

},{"atropa-arrays":4,"atropa-customErrors":5,"atropa-header":6,"atropa-inquire":7}],2:[function(require,module,exports){
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

},{"../src/atropa-Requester.js":3}],3:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-ArgsInfo/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-ArgsInfo/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-ArgsInfo/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.ArgsInfo = require('atropa-ArgsInfo').ArgsInfo;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.Requester">tests</a>
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
     * @type Request Headers Object
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

},{"atropa-ArgsInfo":1,"atropa-header":6}],4:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/**
 * Required module, the docs for it are in the <code>
 *  atropa-inquire/docs</code> directory where this module 
 *  is located.
 * @see <a href="../../../node_modules/atropa-inquire/docs/jsdoc/index.html">
 * ../../../node_modules/atropa-inquire/docs/jsdoc/index.html</a>,
 *  unless you installed this dependency manually.
 */
atropa.inquire = require('atropa-inquire').inquire;
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.arrays">tests</a>
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
 * @param {Array} (minuend) fromB The array with elements duplicated in <code>a</code>
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

},{"atropa-header":6,"atropa-inquire":7}],5:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.customErrors">tests</a>
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

},{"atropa-header":6}],6:[function(require,module,exports){
var atropa = {};

/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>

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
var atropa;
atropa = {};
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


},{}],7:[function(require,module,exports){
/**
 * Container for all Glorious classes, functions, etc.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @namespace Container for all Glorious classes, functions, etc.
 */
var atropa = require('atropa-header');
/// <reference path="../../docs/vsdoc/OpenLayersAll.js"/>
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
 * @see <a href="../../../AtropaToolboxTests.html?spec=atropa.inquire">tests</a>
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

},{"atropa-header":6}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1BcmdzSW5mb1xcc3JjXFxhdHJvcGEtQXJnc0luZm8uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1SZXF1ZXN0ZXJcXGRldlxcYnJvd3Nlck1haW4uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1SZXF1ZXN0ZXJcXHNyY1xcYXRyb3BhLVJlcXVlc3Rlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWFycmF5c1xcc3JjXFxhdHJvcGEtYXJyYXlzLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhdHJvcGEtY29tcG9uZW50c1xcbm9kZV9tb2R1bGVzXFxhdHJvcGEtY3VzdG9tRXJyb3JzXFxzcmNcXGF0cm9wYS1jdXN0b21FcnJvcnMuanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGF0cm9wYS1jb21wb25lbnRzXFxub2RlX21vZHVsZXNcXGF0cm9wYS1oZWFkZXJcXHNyY1xcYXRyb3BhLWhlYWRlci5qcyIsIkM6XFxVc2Vyc1xca2FzdG9yXFxEZXNrdG9wXFxleHBlcmltZW50c1xcYXRyb3BhLWNvbXBvbmVudHNcXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWlucXVpcmVcXHNyY1xcYXRyb3BhLWlucXVpcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8qKlxyXG4gKiBSZXF1aXJlZCBtb2R1bGUsIHRoZSBkb2NzIGZvciBpdCBhcmUgaW4gdGhlIDxjb2RlPlxyXG4gKiAgYXRyb3BhLWlucXVpcmUvZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL2RvY3MvanNkb2MvaW5kZXguaHRtbFwiPlxyXG4gKiAuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXRyb3BhLWlucXVpcmUvZG9jcy9qc2RvYy9pbmRleC5odG1sPC9hPixcclxuICogIHVubGVzcyB5b3UgaW5zdGFsbGVkIHRoaXMgZGVwZW5kZW5jeSBtYW51YWxseS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0gcmVxdWlyZSgnYXRyb3BhLWlucXVpcmUnKS5pbnF1aXJlO1xyXG4vKipcclxuICogUmVxdWlyZWQgbW9kdWxlLCB0aGUgZG9jcyBmb3IgaXQgYXJlIGluIHRoZSA8Y29kZT5cclxuICogIGF0cm9wYS1hcnJheXMvZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1hcnJheXMvZG9jcy9qc2RvYy9pbmRleC5odG1sXCI+XHJcbiAqIC4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtYXJyYXlzL2RvY3MvanNkb2MvaW5kZXguaHRtbDwvYT4sXHJcbiAqICB1bmxlc3MgeW91IGluc3RhbGxlZCB0aGlzIGRlcGVuZGVuY3kgbWFudWFsbHkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzID0gcmVxdWlyZSgnYXRyb3BhLWFycmF5cycpLmFycmF5cztcclxuLyoqXHJcbiAqIFJlcXVpcmVkIG1vZHVsZSwgdGhlIGRvY3MgZm9yIGl0IGFyZSBpbiB0aGUgPGNvZGU+XHJcbiAqICBhdHJvcGEtY3VzdG9tRXJyb3JzL2RvY3M8L2NvZGU+IGRpcmVjdG9yeSB3aGVyZSB0aGlzIG1vZHVsZSBcclxuICogIGlzIGxvY2F0ZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtY3VzdG9tRXJyb3JzL2RvY3MvanNkb2MvaW5kZXguaHRtbFwiPlxyXG4gKiAuLi8uLi8uLi9ub2RlX21vZHVsZXMvYXRyb3BhLWN1c3RvbUVycm9ycy9kb2NzL2pzZG9jL2luZGV4Lmh0bWw8L2E+LFxyXG4gKiAgdW5sZXNzIHlvdSBpbnN0YWxsZWQgdGhpcyBkZXBlbmRlbmN5IG1hbnVhbGx5LlxyXG4gKi9cclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHJlcXVpcmUoJ2F0cm9wYS1jdXN0b21FcnJvcnMnKS5jdXN0b21FcnJvcnM7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuLyoqXHJcbiAqIFRoaXMgcmVwcmVzZW50cyBhIGZpbHRlciBmb3IgYXJndW1lbnRzIGJhc2VkIG9uIHR5cGUuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGEgZmlsdGVyIGZvciBhcmd1bWVudHMgYmFzZWQgb24gdHlwZS5cclxuICogQHJldHVybnMge0FyZ3NJbmZvfSBSZXR1cm5zIGFuIEFyZ3NJbmZvIGZpbHRlci5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5hcnJheXMubWF0Y2hcclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vQXRyb3BhVG9vbGJveFRlc3RzLmh0bWw/c3BlYz1hdHJvcGEuQXJnc0luZm9cIj50ZXN0czwvYT5cclxuICogQGV4YW1wbGVcclxuICogZnVuY3Rpb24gbXlDbGFzc3lDb25zdHJ1Y3Rvcih0YWtlcywgYSwgZmV3LCBhcmdzKSB7XHJcbiAqICAgICB2YXIgZXhwZWN0ZWRBcmdUeXBlcywgY2hlY2tlcjtcclxuICogICAgIFxyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHt9O1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ3N0cmluZycsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgZXhwZWN0ZWRBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBcclxuICogICAgICAgICAgWydzdHJpbmcnLCAnc3RyaW5nJywgJ29iamVjdCcsICdmdW5jdGlvbiddO1xyXG4gKiAgICAgXHJcbiAqICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xyXG4gKiAgICAgY2hlY2tlci5zZXRFeHBlY3RlZEFyZ1R5cGVzKGV4cGVjdGVkQXJnVHlwZXMpO1xyXG4gKiAgICAgXHJcbiAqICAgICB0cnkge1xyXG4gKiAgICAgXHJcbiAqICAgICAgICAgLy8gQ2hlY2sgdGhlIHN1cHBsaWVkIGFyZ3VtZW50cyBwc2V1ZG8gYXJyYXkncyBhcmd1bWVudCB0eXBlc1xyXG4gKiAgICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIG9mIHR5cGVzIGluIGFyZ3VtZW50cyBtYXRjaGVzIG9uZSBvZiB0aGVcclxuICogICAgICAgICAvLyBwYXR0ZXJucyBzZXQgb24gZXhwZWN0ZWRBcmdUeXBlcyB0aGVuIHRoZSBtYXRjaGluZyBwYXR0ZXJuXHJcbiAqICAgICAgICAgLy8gd2lsbCBiZSByZXR1cm5lZC4gT3RoZXJ3aXNlLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICogICAgICAgICBcclxuICogICAgICAgICBjaGVja2VyLmNoZWNrQXJnVHlwZXMoYXJndW1lbnRzKTtcclxuICogICAgIH0gY2F0Y2ggKGUpIHtcclxuICogICAgIFxyXG4gKiAgICAgICAgIC8vIEludmFsaWQgYXJndW1lbnQgdHlwZXMgc3VwcGxpZWQuIEhhbmRsZVxyXG4gKiAgICAgICAgIC8vIHRoZSBlcnJvciBvciBiYWlsLlxyXG4gKiAgICAgICAgIFxyXG4gKiAgICAgfVxyXG4gKiAgICAgXHJcbiAqICAgICAvLyB0aGUgYXJndW1lbnRzIHN1cHBsaWVkIHdpbGwgYmUgb2YgdGhlIHByb3BlciB0eXBlXHJcbiAqICAgICAvLyB5b3VyIGZ1bmN0aW9uIGNhbiBnbyBhaGVhZCBhbmQgZG8gdGhpbmdzIHdpdGggdGhlbVxyXG4gKiB9XHJcbiAqL1xyXG5hdHJvcGEuQXJnc0luZm8gPSBmdW5jdGlvbiBBcmdzSW5mbygpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIHZhciBleHBlY3RlZEFyZ1R5cGVzLFxyXG4gICAgY2hlY2tBcmdzLFxyXG4gICAgdGhhdDtcclxuICAgIC8qKlxyXG4gICAgICogSG9sZHMgdGhlIHByb3BlciByZWZlcmVuY2UgdG8gPGNvZGU+dGhpczwvY29kZT5cclxuICAgICAqIGZvciBwcml2YXRlIGZ1bmN0aW9ucy5cclxuICAgICAqIEB0eXBlIFRoaXNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKi9cclxuICAgIHRoYXQgPSB0aGlzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBIb2xkcyB0aGUgZXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgb2JqZWN0LlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIEV4cGVjdGVkIEFyZyBUeXBlc1xyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLkFyZ3NJbmZvLVxyXG4gICAgICovXHJcbiAgICBleHBlY3RlZEFyZ1R5cGVzID0ge307XHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50IHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHtFeHBlY3RlZCBBcmcgVHlwZXN9IHR5cGVzT2JqIEFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uXHJcbiAgICAgKiAgYWJvdXQgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cyB5b3UgZXhwZWN0LiBTcGVjaWZpY2FsbHksIHRoZSBvYmplY3Qgc2hvdWxkXHJcbiAgICAgKiAgbG9vayBsaWtlIHRoZSBleGFtcGxlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHR5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOlxyXG4gICAgICogXHJcbiAgICAgKiB2YXIgdHlwZXNPYmogPSB7XHJcbiAgICAgKiAgICAgXCJuYW1lZEFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sXHJcbiAgICAgKiAgICAgXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl1cclxuICAgICAqIH07XHJcbiAgICAgKiBcclxuICAgICAqIC8vIFlvdSBtYXkgdXNlIGFzIG1hbnkgbmFtZWQgYXJyYXlzIGFzIHlvdSB3aXNoIGFuZCBjaGVja0FyZ1R5cGVzIHdpbGxcclxuICAgICAqIC8vIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSBwcm92aWRlZCBuYW1lZCBhcnJheXMuXHJcbiAgICAgKiBAdGhyb3dzIHthdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiB0aGVcclxuICAgICAqICB0eXBlc09iaiBjYW4gbm90IGJlIHVzZWQgdG8gc2V0IHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlcy5cclxuICAgICAqL1xyXG4gICAgdGhpcy5zZXRFeHBlY3RlZEFyZ1R5cGVzID0gZnVuY3Rpb24gc2V0RXhwZWN0ZWRBcmdUeXBlcyh0eXBlc09iaikge1xyXG4gICAgICAgIHZhciBlcnJvciwgbmFtZXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZXJyb3IgPSBmYWxzZTtcclxuICAgICAgICBcclxuICAgICAgICBpZihhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwodHlwZXNPYmopKSB7XHJcbiAgICAgICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModHlwZXNPYmopO1xyXG4gICAgICAgICAgICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRBcmdUeXBlcyA9IHR5cGVzT2JqO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAgICAgJ3R5cGVzT2JqIGlzIGV4cGVjdGVkIHRvIGJlIG9mIHRoZSBmb3JtOiB2YXIgdHlwZXNPYmogPSAnICtcclxuICAgICAgICAgICAgICAgICd7IFwibmFtZWRBcmd1bWVudFR5cGVzQXJyYXlcIiA6ICcgK1xyXG4gICAgICAgICAgICAgICAgJyAgICBbXCJzdHJpbmdcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSwgJyArXHJcbiAgICAgICAgICAgICAgICAnXCJuYW1lZEFsdGVybmF0ZUFyZ3VtZW50VHlwZXNBcnJheVwiIDogJyArXHJcbiAgICAgICAgICAgICAgICAnICAgW1wib2JqZWN0XCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0gfTsgJyArXHJcbiAgICAgICAgICAgICAgICAnWW91IG1heSB1c2UgYXMgbWFueSBuYW1lZCBhcnJheXMgYXMgeW91IHdpc2ggYW5kJyArXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tBcmdUeXBlcyB3aWxsIHRlc3QgZm9yIGEgbWF0Y2ggdG8gYXQgbGVhc3Qgb25lIG9mIHRoZSAnICtcclxuICAgICAgICAgICAgICAgICdwcm92aWRlZCBuYW1lZCBhcnJheXMuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR5cGVzIG9mIGFyZ3VtZW50cy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQG1ldGhvZE9mIGF0cm9wYS5BcmdzSW5mbyNcclxuICAgICAqIEBwYXJhbSB7YXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBvYmplY3QsIG9yIGFueXRoaW5nIHlvdSB3YW50IHRvXHJcbiAgICAgKiBjaGVjayB0aGUgdHlwZSBvZi5cclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB0aGUgdHlwZXMgb2YgYXJndW1lbnRzIHBhc3NlZCBpbi5cclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRBcmdUeXBlcyA9IGZ1bmN0aW9uIGdldEFyZ1R5cGVzKGFyZ3MpIHtcclxuICAgICAgICB2YXIgeCxcclxuICAgICAgICBhcmdUeXBlcztcclxuICAgICAgICBhcmdUeXBlcyA9IFtdO1xyXG4gICAgICAgIGZvciAoeCBpbiBhcmdzKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHgpKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdUeXBlcy5wdXNoKHR5cGVvZihhcmdzW3hdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFyZ1R5cGVzO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcGFyZXMgdGhlIGV4cGVjdGVkIGFyZ3VtZW50cyB0eXBlcyB0byB0aGVcclxuICAgICAqIHJlY2VpdmVkIGFyZ3VtZW50cyB0eXBlcy5cclxuICAgICAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gICAgICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuQXJnc0luZm8tXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBleHBlY3RlZFR5cGVzQXJyYXkgQW4gYXJyYXkgdGFrZW4gZnJvbSB0aGUgdXNlclxyXG4gICAgICogY3JlYXRlZCBhcmd1bWVudCB0eXBlcyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0ge2FyZ3VtZW50c30gYXJncyBhbiBhcmd1bWVudHMgb2JqZWN0LlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwZWN0ZWQgdHlwZXMgbWF0Y2ggZm9yIHR5cGVcclxuICAgICAqICBhbmQgYXJlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSByZWNlaXZlZCB0eXBlcy5cclxuICAgICAqIEByZXF1aXJlcyBhdHJvcGEuYXJyYXlzLm1hdGNoXHJcbiAgICAgKi9cclxuICAgIGNoZWNrQXJncyA9IGZ1bmN0aW9uIGNoZWNrQXJncyhleHBlY3RlZFR5cGVzQXJyYXksIGFyZ3MpIHtcclxuICAgICAgICB2YXIgdHlwZXM7XHJcbiAgICAgICAgdHlwZXMgPSB7fTtcclxuICAgICAgICB0eXBlcy5leHBlY3RlZCA9IGV4cGVjdGVkVHlwZXNBcnJheTtcclxuICAgICAgICB0eXBlcy5yZWNlaXZlZCA9IHRoYXQuZ2V0QXJnVHlwZXMoYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIGF0cm9wYS5hcnJheXMubWF0Y2godHlwZXMuZXhwZWN0ZWQsIHR5cGVzLnJlY2VpdmVkKTtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGUgZ2l2ZW4gYXJndW1lbnRzIG9iamVjdCBhZ2FpbnN0IHRoZSBleHBlY3RlZFxyXG4gICAgICogYXJndW1lbnRzIHR5cGVzLlxyXG4gICAgICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICAgICAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLkFyZ3NJbmZvI1xyXG4gICAgICogQHBhcmFtIHthcmd1bWVudHN9IGFyZ3MgQW4gYXJndW1lbnRzIG9iamVjdFxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHVzZXIgYXNzaWduZWQga2V5IHdoaWNoIG1hdGNoZXMgdGhlXHJcbiAgICAgKiBhcmd1bWVudHMgc3VwcGxpZWQsIG9yIHRocm93cyBhbiBlcnJvci5cclxuICAgICAqIEB0aHJvd3Mge2F0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIG5vIG1hdGNoaW5nXHJcbiAgICAgKiAgcGF0dGVybiBvZiBhcmd1bWVudCB0eXBlcyBjYW4gYmUgZm91bmQgZm9yIDxjb2RlPmFyZ3M8L2NvZGU+XHJcbiAgICAgKiBAc2VlIGF0cm9wYS5BcmdzSW5mbyNzZXRFeHBlY3RlZEFyZ1R5cGVzXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2hlY2tBcmdUeXBlcyA9IGZ1bmN0aW9uIGNoZWNrQXJnVHlwZXMoYXJncykge1xyXG4gICAgICAgIHZhciBleHBlY3RlZFR5cGVzO1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhleHBlY3RlZEFyZ1R5cGVzKS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgYXJndW1lbnQgdHlwZXMgaXMgbm90IHNldC4gVXNlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3NldEV4cGVjdGVkQXJnVHlwZXModHlwZXNPYmopIHRvIHNldC4gdHlwZXNPYmogaXMgYW4gJyArXHJcbiAgICAgICAgICAgICAgICAnb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGFycmF5cyBvZiBzdHJpbmdzIHJlcHJlc2VudGluZyAnICtcclxuICAgICAgICAgICAgICAgICd0aGUgdHlwZW9mKGFyZ3VtZW50KSBmb3IgZWFjaCBhcmd1bWVudCwgaW4gdGhlIGV4YWN0IG9yZGVyICcgK1xyXG4gICAgICAgICAgICAgICAgJ2luIHdoaWNoIHRoZXkgd2lsbCBiZSBnaXZlbiB0byB0aGUgZnVuY3Rpb24uIFVzaW5nIG11bHRpcGxlICcgK1xyXG4gICAgICAgICAgICAgICAgJ3Byb3BlcnRpZXMgaXQgaXMgcG9zc2libGUgdG8gZGVmaW5lIGFsdGVybmF0aXZlIGFjY2VwdGFibGUgJyArXHJcbiAgICAgICAgICAgICAgICAnYXJndW1lbnQgdHlwZSBzZXRzLiBVc2UgZ2V0QXJnVHlwZXMoYXJndW1lbnRzKSBhcyBhICcgK1xyXG4gICAgICAgICAgICAgICAgJ2NvbnZlbmllbnQgd2F5IG9mIGdldHRpbmcgdGhlIGFycmF5IHlvdSB3YW50IHRvIGhhcmQgY29kZSAnICtcclxuICAgICAgICAgICAgICAgICdpbiBmb3IgdmFsaWRhdGlvbi4gRXhhbXBsZTogdmFyIHR5cGVzT2JqID0gJyArXHJcbiAgICAgICAgICAgICAgICAneyBcIm1lc3NhZ2VJbmNsdWRlZFwiIDogW1wic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiwgXCJudW1iZXJcIl0sICcgK1xyXG4gICAgICAgICAgICAgICAgJ1wibWVzc2FnZU5vdEluY2x1ZGVkXCIgOiBbXCJvYmplY3RcIiwgXCJmdW5jdGlvblwiLCBcIm51bWJlclwiXSB9OydcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChleHBlY3RlZFR5cGVzIGluIGV4cGVjdGVkQXJnVHlwZXMpIHtcclxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkQXJnVHlwZXMuaGFzT3duUHJvcGVydHkoZXhwZWN0ZWRUeXBlcykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja0FyZ3MoZXhwZWN0ZWRBcmdUeXBlc1tleHBlY3RlZFR5cGVzXSwgYXJncykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWRUeXBlcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKFxyXG4gICAgICAgICAgICAnaW52YWxpZCBhcmd1bWVudCB0eXBlIEAgYXRyb3BhLkFyZ3NJbmZvLmNoZWNrQXJnVHlwZXMnKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsInZhciBSZXF1ZXN0ZXIgPSByZXF1aXJlKCcuLi9zcmMvYXRyb3BhLVJlcXVlc3Rlci5qcycpO1xyXG5cclxudHJ5IHtcclxuICAgIE9iamVjdC5rZXlzKFJlcXVlc3RlcikuZm9yRWFjaChcclxuICAgICAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBpZighYXRyb3BhW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBhdHJvcGFbcHJvcF0gPSBSZXF1ZXN0ZXJbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG59IGNhdGNoIChpZ25vcmUpIHtcclxuICAgIGF0cm9wYSA9IHJlcXVpcmUoJy4uL3NyYy9hdHJvcGEtUmVxdWVzdGVyLmpzJyk7XHJcbn1cclxuXHJcbk9iamVjdC5rZXlzKFJlcXVlc3Rlci5kYXRhKS5maWx0ZXIoXHJcbiAgICBmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wICE9PSAncmVxdWlyZW1lbnRzJztcclxuICAgIH1cclxuKS5mb3JFYWNoKFxyXG4gICAgZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICBhdHJvcGEuZGF0YVtwcm9wXSA9IFJlcXVlc3Rlci5kYXRhW3Byb3BdO1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAbmFtZXNwYWNlIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKi9cclxudmFyIGF0cm9wYSA9IHJlcXVpcmUoJ2F0cm9wYS1oZWFkZXInKTtcclxuLyoqXHJcbiAqIFJlcXVpcmVkIG1vZHVsZSwgdGhlIGRvY3MgZm9yIGl0IGFyZSBpbiB0aGUgPGNvZGU+XHJcbiAqICBhdHJvcGEtQXJnc0luZm8vZG9jczwvY29kZT4gZGlyZWN0b3J5IHdoZXJlIHRoaXMgbW9kdWxlIFxyXG4gKiAgaXMgbG9jYXRlZC5cclxuICogQHNlZSA8YSBocmVmPVwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9kb2NzL2pzZG9jL2luZGV4Lmh0bWxcIj5cclxuICogLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1BcmdzSW5mby9kb2NzL2pzZG9jL2luZGV4Lmh0bWw8L2E+LFxyXG4gKiAgdW5sZXNzIHlvdSBpbnN0YWxsZWQgdGhpcyBkZXBlbmRlbmN5IG1hbnVhbGx5LlxyXG4gKi9cclxuYXRyb3BhLkFyZ3NJbmZvID0gcmVxdWlyZSgnYXRyb3BhLUFyZ3NJbmZvJykuQXJnc0luZm87XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgYXRyb3BhLnJlcXVpcmVzKFxyXG4gICAgICAgICdSZXF1ZXN0ZXInLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBhdHJvcGEuQXJnc0luZm8sXHJcbiAgICAgICAgICAgICAgICBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHByZXJlcXVpc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYocHJlcmVxdWlzaXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufSgpKTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHJlcHJlc2VudHMgYW4gWE1MSHR0cFJlcXVlc3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMxMVxyXG4gKiBAY2xhc3MgVGhpcyByZXByZXNlbnRzIGFuIFhNTEh0dHBSZXF1ZXN0LlxyXG4gKiBAcmV0dXJucyB7UmVxdWVzdGVyfSBSZXR1cm5zIGEgcmVxdWVzdGVyIG9iamVjdC5cclxuICogQHJlcXVpcmVzIGF0cm9wYS5BcmdzSW5mbyNjaGVja0FyZ1R5cGVzXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLlJlcXVlc3RlclwiPnRlc3RzPC9hPlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVxdWVzdGVyLCBmb3JtRGF0YTtcclxuICogXHJcbiAqIHJlcXVlc3RlciA9IG5ldyBhdHJvcGEuUmVxdWVzdGVyKCk7XHJcbiAqIHJlcXVlc3Rlci50aW1lb3V0ID0gMTAwMDA7IC8vIHJlcXVlc3RzIHdpbGwgYWJvcnQgYWZ0ZXIgMTAgc2Vjb25kcy5cclxuICogcmVxdWVzdGVyLnJlcXVlc3RIZWFkZXJzID0ge1xyXG4gKiAgICAgXCJhSGVhZGVyXCIgOiBcImhlYWRlclZhbHVlXCIsXHJcbiAqICAgICBcImFub3RoZXJIZWFkZXJcIiA6IFwiYW5kVmFsdWVcIlxyXG4gKiB9O1xyXG4gKiBcclxuICogZnVuY3Rpb24gc2hvd1JlcXVlc3RSZXN1bHRzKHN0YXR1cywgcmVxdWVzdCkge1xyXG4gKiAgICAgY29uc29sZS5sb2coXCJTdGF0dXM6ICcgKyBzdGF0dXMpO1xyXG4gKiAgICAgY29uc29sZS5kaXIocmVxdWVzdCk7IC8vIGNvbnNvbGUgZGlyIG1heSBvciBtYXkgbm90XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgc3VwcG9ydGVkIGluIHlvdXIgZW52aXJvbm1lbnQuXHJcbiAqIH1cclxuICogXHJcbiAqIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAqIGZvcm1EYXRhLmFwcGVuZCgnYUZvcm1GaWVsZE5hbWUnLCAnZm9ybUZpZWxkRGF0YScpO1xyXG4gKiBmb3JtRGF0YS5hcHBlbmQoJ2Fub3RoZXJGb3JtRmllbGROYW1lJywgJ2FuZERhdGEnKTtcclxuICogXHJcbiAqIHJlcXVlc3Rlci5tYWtlUmVxdWVzdChcclxuICogICAgIFwicG9zdFwiLCBcImh0dHA6Ly9leGFtcGxlLmNvbVwiLCBmb3JtRGF0YSwgc2hvd1JlcXVlc3RSZXN1bHRzKTtcclxuICovXHJcbmF0cm9wYS5SZXF1ZXN0ZXIgPSBmdW5jdGlvbiBSZXF1ZXN0ZXIoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGF0cm9wYS5zdXBwb3J0Q2hlY2soJ1JlcXVlc3RlcicpO1xyXG4gICAgdmFyIGV4cEFyZ1R5cGVzLFxyXG4gICAgICAgIGNoZWNrUmVxdWVzdCxcclxuICAgICAgICByZXF1ZXN0O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIENvbnRhaW5lciBvYmplY3QgZm9yIHRoZSBleHBlY3RlZCBhcmd1bWVudCB0eXBlc1xyXG4gICAgICogc3VwcGxpZWQgdG8gdGhpcy5tYWtlUmVxdWVzdC5cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAdHlwZSBFeHBlY3RlZCBBcmcgVHlwZXNcclxuICAgICAqIEBmaWVsZE9mIGF0cm9wYS5SZXF1ZXN0ZXItXHJcbiAgICAgKi9cclxuICAgIGV4cEFyZ1R5cGVzID0ge307XHJcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0V2l0aE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnc3RyaW5nJywgJ2Z1bmN0aW9uJ107XHJcbiAgICBleHBBcmdUeXBlcy5yZXF1ZXN0TnVsbE1lc3NhZ2UgPSBbJ3N0cmluZycsICdzdHJpbmcnLCAnb2JqZWN0JywgJ2Z1bmN0aW9uJ107XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBjaGVjayB0aGUgYXJndW1lbnRzIHR5cGVzIHN1cHBsaWVkIHRvIHRoaXMubWFrZVJlcXVlc3QuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1cclxuICAgICAqIEBwYXJhbSB7QXJndW1lbnRzfSBhcmdzIEFuIGFyZ3VtZW50cyBhcnJheVxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBhcmdzIHR5cGVzIG1hdGNoIHRoZVxyXG4gICAgICogZXhwZWN0ZWQgdHlwZXMuXHJcbiAgICAgKiBAcmVxdWlyZXMgYXRyb3BhLkFyZ3NJbmZvI2NoZWNrQXJnVHlwZXNcclxuICAgICAqL1xyXG4gICAgY2hlY2tSZXF1ZXN0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgY2hlY2tlcjtcclxuICAgICAgICBjaGVja2VyID0gbmV3IGF0cm9wYS5BcmdzSW5mbygpO1xyXG4gICAgICAgIGNoZWNrZXIuc2V0RXhwZWN0ZWRBcmdUeXBlcyhleHBBcmdUeXBlcyk7XHJcbiAgICAgICAgcmV0dXJuIGNoZWNrZXIuY2hlY2tBcmdUeXBlcyhhcmdzKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYW5kIHZhbHVlcyBhcmUgaGVhZGVyIG5hbWVzIGFuZCB2YWx1ZXNcclxuICAgICAqICByZXNwZWN0aXZlbHkuXHJcbiAgICAgKiBAdHlwZSBSZXF1ZXN0IEhlYWRlcnMgT2JqZWN0XHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyI1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlcXVlc3RIZWFkZXJzID0ge307XHJcbiAgICBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRpbWVvdXQgdmFsdWUgZm9yIHRoZSByZXF1ZXN0IGluIG1pbGxpc2Vjb25kcy4gVGhlIHJlcXVlc3Qgd2lsbFxyXG4gICAgICogIGFib3J0IGFmdGVyIHRoaXMgYW1vdW50IG9mIHRpbWUgaGFzIHBhc3NlZC5cclxuICAgICAqIEB0eXBlIE51bWJlclxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLlJlcXVlc3RlciNcclxuICAgICAqL1xyXG4gICAgdGhpcy50aW1lb3V0ID0gMzAwMDA7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogWE1MSHR0cFJlcXVlc3Qgb2JqZWN0IHVzZWQgYnkgUmVxdWVzdGVyLlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEB0eXBlIFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuUmVxdWVzdGVyLVxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICByZXF1ZXN0LmFib3J0ZWQgPSBmYWxzZTtcclxuICAgIHJlcXVlc3QuYWJvcnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXF1ZXN0LmFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5hYm9ydC5jYWxsKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWtlcyBhbiBBSkFYIHJlcXVlc3QuXHJcbiAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gICAgICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gICAgICogQHZlcnNpb24gMjAxMzAzMTFcclxuICAgICAqIEBtZXRob2RPZiBhdHJvcGEuUmVxdWVzdGVyI1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBUaGUgSFRUUCBtZXRob2QgdG8gYmUgdXNlZCBmb3IgdGhpcyByZXF1ZXN0LlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIHNlbmQgdGhlIHJlcXVlc3QgdG8uXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZUJvZHkgVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcclxuICAgICAqICB3aGVuIHJlYWR5U3RhdGUgaXMgNC4gVGhlIGNhbGxiYWNrIGlzIHN1cHBsaWVkIHdpdGggdHdvIGFyZ3VtZW50cy4gVGhlXHJcbiAgICAgKiAgZmlyc3QgYXJndW1lbnQgaXMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciBvciBub3QgdGhlIGh0dHAgc3RhdHVzXHJcbiAgICAgKiAgd2FzIDIwMC4gVGhlIHNlY29uZCBhcmd1bWVudCBpcyB0aGUgcmVxdWVzdCBvYmplY3QuXHJcbiAgICAgKiBAdGhyb3dzIGF0cm9wYS5SZXF1ZXN0ZXIubWFrZVJlcXVlc3QgdW5leHBlY3RlZCBhcmd1bWVudCB0eXBlXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFrZVJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIG1lc3NhZ2VCb2R5LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBoZHI7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY2hlY2tSZXF1ZXN0KGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5SZXF1ZXN0ZXIubWFrZVJlcXVlc3QgdW5leHBlY3RlZCAnICtcclxuICAgICAgICAgICAgICAgICdhcmd1bWVudCB0eXBlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3QuYWJvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcbiAgICAgICAgZm9yIChoZHIgaW4gdGhpcy5yZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXF1ZXN0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZHIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoaGRyLCB0aGlzLnJlcXVlc3RIZWFkZXJzW2hkcl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV2ZW50IGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgQUpBWCByZXF1ZXN0LlxyXG4gICAgICAgICAqIFRoaXMgaXMgd2hhdCBhY3R1YWxseSBmaXJlcyB0aGUgY2FsbGJhY2sgc3VwcGxpZWRcclxuICAgICAgICAgKiB0byBtYWtlUmVxdWVzdC5cclxuICAgICAgICAgKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICAgICAgICAgKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICAgICAgICAgKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAgICAgICAgICogQHZlcnNpb24gMjAxMjA5MDlcclxuICAgICAgICAgKiBAbWV0aG9kT2YgYXRyb3BhLlJlcXVlc3Rlci1yZXF1ZXN0XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0LnNlbmQobWVzc2FnZUJvZHkpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5hYm9ydGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcclxuICAgIH07XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG53aGlsZShhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLnBvcCgpKCk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBhdHJvcGE7XHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vKipcclxuICogUmVxdWlyZWQgbW9kdWxlLCB0aGUgZG9jcyBmb3IgaXQgYXJlIGluIHRoZSA8Y29kZT5cclxuICogIGF0cm9wYS1pbnF1aXJlL2RvY3M8L2NvZGU+IGRpcmVjdG9yeSB3aGVyZSB0aGlzIG1vZHVsZSBcclxuICogIGlzIGxvY2F0ZWQuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdHJvcGEtaW5xdWlyZS9kb2NzL2pzZG9jL2luZGV4Lmh0bWxcIj5cclxuICogLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2F0cm9wYS1pbnF1aXJlL2RvY3MvanNkb2MvaW5kZXguaHRtbDwvYT4sXHJcbiAqICB1bmxlc3MgeW91IGluc3RhbGxlZCB0aGlzIGRlcGVuZGVuY3kgbWFudWFsbHkuXHJcbiAqL1xyXG5hdHJvcGEuaW5xdWlyZSA9IHJlcXVpcmUoJ2F0cm9wYS1pbnF1aXJlJykuaW5xdWlyZTtcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RvY3MvdnNkb2MvT3BlbkxheWVyc0FsbC5qc1wiLz5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIGF0cm9wYSAqL1xyXG4vLyBlbmQgaGVhZGVyXHJcblxyXG4vKipcclxuICogVXRpbGl0aWVzIGZvciBoYW5kbGluZyBhcnJheXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDIyMVxyXG4gKiBAbmFtZXNwYWNlIFV0aWxpdGllcyBmb3IgaGFuZGxpbmcgYXJyYXlzLlxyXG4gKiBAc2VlIDxhIGhyZWY9XCIuLi8uLi8uLi9BdHJvcGFUb29sYm94VGVzdHMuaHRtbD9zcGVjPWF0cm9wYS5hcnJheXNcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5hcnJheXMgPSB7fTtcclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgYmFzZWQgb24gc2l6ZSwgY29udGVudHMsIGFuZCBlbGVtZW50IG9yZGVyLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkxIE9uZSBhcnJheSB5b3Ugd2FudCBjb21wYXJlZCB0byBhbm90aGVyLlxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheTIgVGhlIG90aGVyIGFycmF5LlxyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIG9yIGZhbHNlIGRlcGVuZGluZyBvblxyXG4gKiAgd2hldGhlciBvciBub3QgdGhlIGFycmF5cyBtYXRjaGVkIGluIHNpemUsIGNvbXBvc2l0aW9uLCBhbmRcclxuICogIGVsZW1lbnQgb3JkZXIuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5tYXRjaCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIGZhbHNlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMl07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyB0cnVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzIsMV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIHRoZSBlbGVtZW50cyBhcmUgbm90IGluIHRoZSBzYW1lIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLHsnYVByb3AnIDogJ2FWYWx1ZSd9XTtcclxuICogdmFyIHkgPSBbMSx7J2FQcm9wJyA6ICdhVmFsdWUnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMubWF0Y2goeCx5KTtcclxuICogLy8gcmV0dXJucyBmYWxzZSBiZWNhdXNlIGV2ZW4gdGhvdWdoIHRoZSBvYmplY3QgbG9va3MgdGhlIHNhbWUsIHRoZVxyXG4gKiAvLyB0d28gb2JqZWN0cyBhcmUgaW4gZmFjdCBkaXN0aW5jdCBvYmplY3RzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbHVlJ307XHJcbiAqIHZhciB4ID0gWzEsb2JqXTtcclxuICogdmFyIHkgPSBbMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLm1hdGNoKHgseSk7XHJcbiAqIC8vIHJldHVybnMgdHJ1ZSBiZWNhdXNlIHRoZSBvYmplY3RzIHJlZmVyZW5jZWQgaW4gdGhlIGFycmF5cyBhcmVcclxuICogLy8gaW4gZmFjdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLm1hdGNoID0gZnVuY3Rpb24gYXJyYXlzTWF0Y2goYXJyYXkxLCBhcnJheTIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHgsXHJcbiAgICBsO1xyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBsID0gYXJyYXkxLmxlbmd0aDtcclxuICAgIGZvciAoeCA9IDA7IHggPCBsOyB4ICs9IDEpIHtcclxuICAgICAgICBpZiAoYXJyYXkxW3hdICE9PSBhcnJheTJbeF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG4vKipcclxuICogU3VidHJhY3RzIG9uZSBhcnJheSBmcm9tIGFub3RoZXIgYXJyYXkgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgaW4gYm90aFxyXG4gKiAgc2V0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGEgKHN1YnRyYWhlbmQpIFRoZSBhcnJheSB0byBzdWJ0cmFjdC5cclxuICogQHBhcmFtIHtBcnJheX0gKG1pbnVlbmQpIGZyb21CIFRoZSBhcnJheSB3aXRoIGVsZW1lbnRzIGR1cGxpY2F0ZWQgaW4gPGNvZGU+YTwvY29kZT5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IGNvbnRhaW5pbmcgb25seSB0aGUgdW5pcXVlXHJcbiAqICB2YWx1ZXMgZm91bmQgaW4gPGNvZGU+ZnJvbUI8L2NvZGU+IHRoYXQgYXJlIG5vdCBwcmVzZW50IGluIDxjb2RlPmE8L2NvZGU+XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMl07XHJcbiAqIHZhciB5ID0gWzEsMSwzXTtcclxuICogYXRyb3BhLmFycmF5cy5zdWJ0cmFjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFszXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDNdO1xyXG4gKiB2YXIgeSA9IFszLDFdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzXTtcclxuICogdmFyIHkgPSBbMywxLDEsOV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbOV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIHZhciB5ID0gWzMsMSx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW3snYVByb3AnIDogJ2FWYWwnfV0gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIHR3byBvYmplY3RzIGFyZSBub3QgdGhlIHNhbWUgb2JqZWN0LlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMsb2JqXTtcclxuICogdmFyIHkgPSBbMywxLHsnYVByb3AnIDogJ2FWYWwnfV07XHJcbiAqIGF0cm9wYS5hcnJheXMuc3VidHJhY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbeydhUHJvcCcgOiAnYVZhbCd9XSBcclxuICogLy8gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvYmogPSB7J2FQcm9wJyA6ICdhVmFsJ31cclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLnN1YnRyYWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgW10gXHJcbiAqIC8vIGJlY2F1c2UgdGhlIG9iamVjdHMgcmVmZXJlbmNlZCBpbiB0aGUgYXJyYXlzIGFyZSB0aGUgc2FtZSBvYmplY3QuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnN1YnRyYWN0ID0gZnVuY3Rpb24oYSwgZnJvbUIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIHRoZSA9IHt9O1xyXG4gICAgdGhlLnJlc3VsdCA9IFtdO1xyXG4gICAgZnJvbUIuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICB0aGUubWFyayA9IGZhbHNlO1xyXG4gICAgICAgIGEuZm9yRWFjaChmdW5jdGlvbihybSl7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0gPT09IHJtKSB7XHJcbiAgICAgICAgICAgICAgICB0aGUubWFyayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih0aGUubWFyayAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGUucmVzdWx0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhlLnJlc3VsdDtcclxufTtcclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIGZvdW5kIGluIGJvdGggb2YgdGhlIGdpdmVuIGFycmF5cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTEyXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5MSBBbiBhcnJheS5cclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkyIEFub3RoZXIgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgZm91bmQgaW4gYm90aCBvZiB0aGUgZ2l2ZW5cclxuICogIGFycmF5cy5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwzLDRdO1xyXG4gKiB2YXIgeSA9IFszLDEsNV07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDMsNF07XHJcbiAqIHZhciB5ID0gWzMsMSwxLDVdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDEsM11cclxuICogQGV4YW1wbGVcclxuICogdmFyIG9iaiA9IHsnYVByb3AnIDogJ2FWYWwnfTtcclxuICogdmFyIHggPSBbMSwzLG9ial07XHJcbiAqIHZhciB5ID0gWzMsMSxvYmpdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmludGVyc2VjdCh4LHkpO1xyXG4gKiAvLyByZXR1cm5zIFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogdmFyIHkgPSBbMywxLG9ial07XHJcbiAqIGF0cm9wYS5hcnJheXMuaW50ZXJzZWN0KHgseSk7XHJcbiAqIC8vIHJldHVybnMgWzEsM10gYmVjYXVzZSB0aGUgdHdvIG9iamVjdHMgYXJlIG5vdCB0aGUgc2FtZSBvYmplY3QuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyx7J2FQcm9wJyA6ICdhVmFsJ31dO1xyXG4gKiB2YXIgeSA9IFszLDEseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5pbnRlcnNlY3QoeCx5KTtcclxuICogLy8gcmV0dXJucyBbMSwzXSBiZWNhdXNlIHRoZSB0d28gb2JqZWN0cyBhcmUgbm90IHRoZSBzYW1lIG9iamVjdC5cclxuICovXHJcbmF0cm9wYS5hcnJheXMuaW50ZXJzZWN0ID0gZnVuY3Rpb24gaW50ZXJzZWN0KGFycmF5MSwgYXJyYXkyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBzbWFsbEFycmF5LCBsYXJnZUFycmF5LCBpbnRlcnNlY3Rpb24gPSBbXTtcclxuICAgIGlmKGFycmF5MS5sZW5ndGggPiBhcnJheTIubGVuZ3RoKSB7XHJcbiAgICAgICAgbGFyZ2VBcnJheSA9IGFycmF5MS5zcGxpY2UoMCk7XHJcbiAgICAgICAgc21hbGxBcnJheSA9IGFycmF5Mi5zcGxpY2UoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxhcmdlQXJyYXkgPSBhcnJheTIuc3BsaWNlKDApO1xyXG4gICAgICAgIHNtYWxsQXJyYXkgPSBhcnJheTEuc3BsaWNlKDApO1xyXG4gICAgfVxyXG4gICAgc21hbGxBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkeEluTGFyZ2VBcnJheSA9IGxhcmdlQXJyYXkuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICBpZiAoMCA8PSBpZHhJbkxhcmdlQXJyYXkpIHsgLy8gaGFzIHdvcmRcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uLnB1c2gobGFyZ2VBcnJheS5zcGxpY2UoaWR4SW5MYXJnZUFycmF5LCAxKVswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uO1xyXG59O1xyXG4vKipcclxuICogQ2FsY3VsYXRlcyB0aGUgZnJlcXVlbmN5IG9mIGl0ZW1zIG9jY3VycmluZyBpbiBhbiBhcnJheS5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gY2FsY3VsYXRlIGZyZXF1ZW5jaWVzIGZyb20uXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdob3NlIGtleXMgYXJlIGVhY2ggdW5pcXVlXHJcbiAqICBlbGVtZW50cyBmcm9tIHRoZSBhcnJheSBhbmQgdGhlaXIgdmFsdWUgaXMgdGhlaXIgZnJlcXVlbmN5IG9mXHJcbiAqICBvY2N1cnJlbmNlIHdpdGhpbiB0aGUgYXJyYXkuIEJlIGNhcmVmdWwgdGhhdCB5b3VyIGFycmF5IGRvZXNcclxuICogIG5vdCBjb250YWluIHZhbHVlcyBtYXRjaGluZyBvYmplY3QgaW5zdGFuY2UgcHJvcGVydHkgbmFtZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMSwxLDEsMSwzLDNdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogNSxcclxuICogLy8gICAgIFwiM1wiOiAyXHJcbiAqIC8vIH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbXCJiaWxsXCIsIFwiZnJlZFwiLCBcImZyZWRcIiwgXCJqYW5lXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcImJpbGxcIjogMSxcclxuICogLy8gICAgIFwiZnJlZFwiOiAyLFxyXG4gKiAvLyAgICAgXCJqYW5lXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsxLDMseydhUHJvcCcgOiAnYVZhbCd9XTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRGcmVxdWVuY3koeCk7XHJcbiAqIC8vIHJldHVybnMge1xyXG4gKiAvLyAgICAgXCIxXCI6IDEsXHJcbiAqIC8vICAgICBcIjNcIjogMSxcclxuICogLy8gICAgIFwiW29iamVjdCBPYmplY3RdXCI6IDFcclxuICogLy8gfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb2JqID0geydhUHJvcCcgOiAnYVZhbCd9O1xyXG4gKiB2YXIgb3RoZXJPYmogPSB7fTtcclxuICogdmFyIHggPSBbMSwzLG9iaixvdGhlck9iaix7J2FEb3VnaG51dCcgOiAnc3ByaW5rbGVzJ31dO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJbb2JqZWN0IE9iamVjdF1cIjogM1xyXG4gKiAvLyB9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWzEsMyxcInRvU3RyaW5nXCJdO1xyXG4gKiBhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSh4KTtcclxuICogLy8gcmV0dXJucyB7XHJcbiAqIC8vICAgICBcIjFcIjogMSxcclxuICogLy8gICAgIFwiM1wiOiAxLFxyXG4gKiAvLyAgICAgXCJ0b1N0cmluZ1wiOiBcImZ1bmN0aW9uIHRvU3RyaW5nKCkge1xcbiAgICBbbmF0aXZlIGNvZGVdXFxufTFcIlxyXG4gKiAvLyB9XHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeSA9IGZ1bmN0aW9uIChhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3Vycikge1xyXG4gICAgICAgIGlmIChhY2NbY3Vycl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBhY2NbY3Vycl0gPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjY1tjdXJyXSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIEdldHMgVW5pcXVlIHZhbHVlcyBmcm9tIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gbGFyZ2VBcnJheSBUaGUgYXJyYXkgd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgY29udGFpbmluZyBvbmx5IHRoZSB1bmlxdWVcclxuICogIHZhbHVlcyBmb3VuZCBpbiB0aGUgbGFyZ2VBcnJheS5cclxuICogQGV4YW1wbGVcclxuICogdmFyIHggPSBbMSwxLDEsNCw0LDMsNl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFsgXCIxXCIsIFwiNFwiLCBcIjNcIiwgXCI2XCIgXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiLCBcImZyZWRcIl07XHJcbiAqIGF0cm9wYS5hcnJheXMuZ2V0VW5pcXVlKHgpO1xyXG4gKiAvLyByZXR1cm5zIFtcImJpbGxcIiwgXCJmcmVkXCIsIFwiamFuZVwiXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXHJcbiAqICAgICBcImJpbGxcIixcclxuICogICAgIHtcImFQcm9wXCIgOiBcImFWYWx1ZVwifSxcclxuICogICAgIHtcImFHdXlcIiA6IFwiZnJlZFwifSxcclxuICogICAgIHtcImFMYWR5XCIgOiBcImphbmVcIn1cclxuICogXTtcclxuICogYXRyb3BhLmFycmF5cy5nZXRVbmlxdWUoeCk7XHJcbiAqIC8vIHJldHVybnMgWyBcImJpbGxcIiwgXCJbb2JqZWN0IE9iamVjdF1cIiBdXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmdldFVuaXF1ZSA9IGZ1bmN0aW9uIChsYXJnZUFycmF5KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhhdHJvcGEuYXJyYXlzLmdldEZyZXF1ZW5jeShsYXJnZUFycmF5KSkuc29ydCgpO1xyXG59O1xyXG4vKipcclxuICogUmVtb3ZlcyBlbXB0eSBzdHJpbmdzIGZyb20gdGhlIGdpdmVuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlXaXRoRW1wdHlFbGVtZW50cyBUaGUgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIGluIGl0LlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBlbXB0eSBzdHJpbmdzIHJlbW92ZWQuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB4ID0gWyAxMCwgLCA1LCBcIlwiLCAnJywgNyBdO1xyXG4gKiBjb25zb2xlLmxvZygnc3RhcnRpbmcgbGVuZ3RoICcgKyB4Lmxlbmd0aCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpO1xyXG4gKiB4ID0gYXRyb3BhLmFycmF5cy5yZW1vdmVFbXB0eUVsZW1lbnRzKHgpO1xyXG4gKiBjb25zb2xlLmxvZygnZW5kaW5nIGxlbmd0aCAnICsgeC5sZW5ndGgpO1xyXG4gKiBjb25zb2xlLmxvZyh4KTtcclxuICogLy8gZGlzcGxheXMgdGhlIGZvbGxvd2luZ1xyXG4gKiAvLyBzdGFydGluZyBsZW5ndGggNlxyXG4gKiAvLyBbMTAsIHVuZGVmaW5lZCwgNSwgXCJcIiwgXCJcIiwgN11cclxuICogLy8gZW5kaW5nIGxlbmd0aCAzXHJcbiAqIC8vIFsxMCwgNSwgN11cclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVtb3ZlRW1wdHlFbGVtZW50cyA9IGZ1bmN0aW9uIChhcnJheVdpdGhFbXB0eUVsZW1lbnRzKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhcnJheVdpdGhFbXB0eUVsZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyhpdGVtKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogUmVpbmRleGVzIGFuIGFycmF5LlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAxMThcclxuICogQHBhcmFtIHtBcnJheX0gYXJyIFRoZSBhcnJheSB3aXRoIGRpc2NvbnRpbnVvdXMga2V5cy5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdpdGggY29udGludW91cyBrZXlzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFsgXCJhXCIsIFwiYlwiLCBcImNcIiwgdW5kZWZpbmVkIF07XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCBcImJcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqIGNvbnNvbGUubG9nKHgubGVuZ3RoKTsgLy8gNFxyXG4gKiBcclxuICogZGVsZXRlIHhbMV07IC8vIGRlbGV0ZXMgdGhlIGtleSBmcm9tIHRoZSBhcnJheSBidXRcclxuICogICAgICAgICAgICAgIC8vIHRoZSBhcnJheSBsZW5ndGggcmVtYWlucyB0aGUgc2FtZVxyXG4gKiAgICAgICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgYXJyYXlzIGtleXMgYXJlIDAsIDIsIGFuZCAzXHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyBbIFwiYVwiLCB1bmRlZmluZWQsIFwiY1wiLCB1bmRlZmluZWQgXVxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDRcclxuICogXHJcbiAqIHggPSBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoeCk7XHJcbiAqIGNvbnNvbGUubG9nKHgpOyAvLyAgWyBcImFcIiwgXCJjXCIsIHVuZGVmaW5lZCBdXHJcbiAqICAgIC8vIG5vdGUgdGhhdCB0aGUgbGFzdCBlbGVtZW50IGV4aXN0ZWQgaW4gdGhlIGFycmF5LCBpdHMgdmFsdWUgd2FzXHJcbiAqICAgIC8vIHVuZGVmaW5lZCBidXQgaXQgZGlkIGhhdmUgYSBrZXkgc28gdGhlIGVsZW1lbnQgcmVtYWlucyBpbiB0aGUgYXJyYXkuXHJcbiAqICAgIC8vXHJcbiAqICAgIC8vIFRoZSBkZWxldGVkIGVsZW1lbnQgd2FzIGluIGZhY3QgZGVsZXRlZCBmcm9tIHRoZSBhcnJheSBzbyB0aGVyZSB3YXMgbm9cclxuICogICAgLy8ga2V5IHhbMV0gYXQgYWxsLCB3aGVuIHRyeWluZyB0byBhY2Nlc3MgdGhpcyBub24gZXhpc3RpbmcgZWxlbWVudCB0aGVcclxuICogICAgLy8gdmFsdWUgb2YgdW5kZWZpbmVkIHdhcyByZXR1cm5lZC4gVGhpcyBiZWhhdmlvciBpcyBjb25mdXNpbmcgdW5sZXNzIHlvdVxyXG4gKiAgICAvLyB0aGluayBhYm91dCB0aGUgYXJyYXlhcyBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgbmFtZWQgYnlcclxuICogICAgLy8gbnVtYmVycy4gQWNjZXNzaW5nIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSByZXR1cm5zIHVuZGVmaW5lZCByZWdhcmRsZXNzXHJcbiAqICAgIC8vIG9mIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0ZWQgaW4gdGhlIHBhc3Qgb3Igbm90LlxyXG4gKiBjb25zb2xlLmxvZyh4Lmxlbmd0aCk7IC8vIDNcclxuICovXHJcbmF0cm9wYS5hcnJheXMucmVpbmRleCA9IGZ1bmN0aW9uIHJlaW5kZXgoYXJyKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHZhciBpZHgsIG91dDtcclxuICAgIG91dCA9IFtdO1xyXG4gICAgZm9yKGlkeCBpbiBhcnIpIHtcclxuICAgICAgICBpZihhcnIuaGFzT3duUHJvcGVydHkoaWR4KSkge1xyXG4gICAgICAgICAgICBvdXQucHVzaChhcnJbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuLyoqXHJcbiAqIFNvcnRzIGFuIGFycmF5J3MgZWxlbWVudHMgbnVtZXJpY2FsbHkuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDEyMFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgVGhlIGFycmF5IHRvIHNvcnQuIEFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgbXVzdCBiZVxyXG4gKiAgbnVtYmVyLWlzaC5cclxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IHdob3NlIGVsZW1lbnRzIGFyZSBpbiBudW1lcmljIG9yZGVyLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgeCA9IFszLCAyLCA5LCAyNiwgMTAsIDEsIDk5LCAxNV07XHJcbiAqIGNvbnNvbGUubG9nKCBhdHJvcGEuYXJyYXlzLnNvcnROdW1lcmljYWxseSh4KSApO1xyXG4gKiAvLyBsb2dzIFsxLCAyLCAzLCA5LCAxMCwgMTUsIDI2LCA5OV1cclxuICovXHJcbmF0cm9wYS5hcnJheXMuc29ydE51bWVyaWNhbGx5ID0gZnVuY3Rpb24gc29ydE51bWVyaWNhbGx5KGFycikge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gKGEgLSBiKTtcclxuICAgIH0pO1xyXG59O1xyXG4vKipcclxuICogVGhyb3dzIGFuIGVycm9yLCA8Y29kZT5TdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmU8L2NvZGU+IGlzIG5vdCBcclxuICogIHN0YW5kYXJkaXplZC5cclxuICogXHJcbiAqICBZZXMsIGxvY2FsZUNvbXBhcmUgaXMgaW4gdGhlIHN0YW5kYXJkIGJ1dCwgYXQgdGhpcyB0aW1lIHRoZSBhY3R1YWxcclxuICogIGNvbXBhcmlzb24gaXMgaW1wbGVtZW50YXRpb24gZGVwZW5kYW50LiBUaGlzIG1lYW5zIHRoYXQgXCJhbHBoYWJldGljYWwgb3JkZXJcIlxyXG4gKiAgY2FuIGJlIGRpZmZlcmVudCBvbiBkaWZmZXJlbnQgcGxhdGZvcm1zLiBXaGF0IEkgZm91bmQgd2FzIHRoYXQgaW4gbm9kZSB0aGVcclxuICogIGFycmF5IG9mIDxjb2RlPlsnYScsJ1onLCdBJywneiddPC9jb2RlPiB3b3VsZCBiZSBzb3J0ZWQgdG9cclxuICogIDxjb2RlPlsnQScsJ1onLCdhJywnelwiXTwvY29kZT4sIHdoaWxlIG9uXHJcbiAqICBmaXJlZm94IGl0IHdvdWxkIGJlIHNvcnRlZCB0byA8Y29kZT5bJ2EnLCdBJywneicsJ1onXTwvY29kZT4uIFdobyBrbm93cyBpZlxyXG4gKiAgYW5vdGhlciBpbXBsZW1lbnRvciB3b3VsZCBzb3J0IGl0IDxjb2RlPlsnQScsJ2EnLCdaJywneiddPC9jb2RlPj9cclxuICogXHJcbiAqIEluIG9yZGVyIHRvIHByb3ZpZGUgYSByZWxpYWJsZSBpbXBsZW1lbnRhdGlvbiBJIHdvdWxkIGhhdmUgdG8gY3JlYXRlIG15IG93blxyXG4gKiAgaW1wbGVtZW50YXRpb24gb2YgPGNvZGU+U3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlPC9jb2RlPiBhbmQgdGhhdCdzXHJcbiAqICBqdXN0IHRvbyBtdWNoIHdvcmsgZm9yIG1lIHRvIGRvIGFsb25lLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gXCJTdHJpbmcucHJvdG90eXBlLmxvY2FsZUNvbXBhcmUgaXMgbm90IHN0YW5kYXJkaXplZFwiXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLnNvcnRBbHBoYWJldGljYWxseSA9IGZ1bmN0aW9uIHNvcnRBbHBoYWJldGljYWxseShhcnIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3RyaW5nLnByb3RvdHlwZS5sb2NhbGVDb21wYXJlIGlzIG5vdCBzdGFuZGFyZGl6ZWRcIik7XHJcbn07XHJcbi8qKlxyXG4gKiBEZWxldGVzIHRoZSBnaXZlbiBlbGVtZW50IGZyb20gdGhlIGFycmF5IGF0IHRoZSBnaXZlbiBpbmRleC4gSXQgYmFzaWNhbGx5XHJcbiAqICBkb2VzIHdoYXQgeW91IHdvdWxkIGV4cGVjdCB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIGRvLCBleGNlcHQgdGhlIGRlbGV0ZVxyXG4gKiAgb3BlcmF0b3IgZG9lc24ndCBkbyB3aGF0IHlvdSB3b3VsZCBleHBlY3QuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlLlxyXG4gKiBAcmV0dXJucyBSZXR1cm5zIGFuIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgcmVtb3ZlZCwgY29udGlndW91cyBrZXlzLCBhbmRcclxuICogIHdob3NlIGxlbmd0aCBpcyAxIGxlc3MgdGhhbiB0aGUgaW5wdXQgYXJyYXkuXHJcbiAqL1xyXG5hdHJvcGEuYXJyYXlzLmRlbGV0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICBkZWxldGUgYXJyW2luZGV4XTtcclxuICAgIHJldHVybiBhdHJvcGEuYXJyYXlzLnJlaW5kZXgoYXJyKTtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIiwiLyoqXHJcbiAqIENvbnRhaW5lciBmb3IgYWxsIEdsb3Jpb3VzIGNsYXNzZXMsIGZ1bmN0aW9ucywgZXRjLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICovXHJcbnZhciBhdHJvcGEgPSByZXF1aXJlKCdhdHJvcGEtaGVhZGVyJyk7XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kb2NzL3ZzZG9jL09wZW5MYXllcnNBbGwuanNcIi8+XHJcbi8qanNsaW50XHJcbiAgICBpbmRlbnQ6IDQsXHJcbiAgICBtYXhlcnI6IDUwLFxyXG4gICAgd2hpdGU6IHRydWUsXHJcbiAgICBicm93c2VyOiB0cnVlLFxyXG4gICAgZGV2ZWw6IHRydWUsXHJcbiAgICBwbHVzcGx1czogdHJ1ZSxcclxuICAgIHJlZ2V4cDogdHJ1ZVxyXG4qL1xyXG4vKmdsb2JhbCBhdHJvcGEgKi9cclxuLy8gZW5kIGhlYWRlclxyXG4vKipcclxuICogQ29udGFpbmVyIGZvciBjdXN0b20gRXJyb3JzLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGN1c3RvbSBFcnJvcnMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmN1c3RvbUVycm9yc1wiPnRlc3RzPC9hPlxyXG4gKi9cclxuYXRyb3BhLmN1c3RvbUVycm9ycyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIEludmFsaWQgQXJndW1lbnQgVHlwZXMgRXJyb3JcclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMjIxXHJcbiAqIEBjbGFzcyBJbnZhbGlkIEFyZ3VtZW50IFR5cGVzIEVycm9yXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIE9wdGlvbmFsLiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLiBEZWZhdWx0cyB0b1xyXG4gKiAgPGNvZGU+SW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvcjwvY29kZT5cclxuICogQHJldHVybnMge0Vycm9yfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXHJcbiAqL1xyXG5hdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IgPSBmdW5jdGlvbiBJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yKG1lc3NhZ2UpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLiBUZWxscyB0aGUgdXNlciB3aGF0IGtpbmQgb2YgY3VzdG9tXHJcbiAgICAgKiBlcnJvciBoYXMgYmVlbiB0aHJvd24uXHJcbiAgICAgKiBAZmllbGRPZiBhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3IjXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICogQGRlZmF1bHQgXCJhdHJvcGEuY3VzdG9tRXJyb3JzLkludmFsaWRBcmd1bWVudFR5cGVzRXJyb3JcIlxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBcImF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZXJyb3IgbWVzc2FnZSB0byBzZW5kLlxyXG4gICAgICogQGZpZWxkT2YgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yI1xyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEBkZWZhdWx0IFwiSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvclwiXHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJJbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yXCI7XHJcbn07XHJcbmF0cm9wYS5jdXN0b21FcnJvcnMuSW52YWxpZEFyZ3VtZW50VHlwZXNFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcclxuYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFxyXG4gICAgYXRyb3BhLmN1c3RvbUVycm9ycy5JbnZhbGlkQXJndW1lbnRUeXBlc0Vycm9yO1xyXG5cclxuXHJcblxyXG5cclxud2hpbGUoYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5wb3AoKSgpO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gYXRyb3BhO1xyXG4iLCJ2YXIgYXRyb3BhID0ge307XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG5cclxuLypqc2xpbnRcclxuICAgIGluZGVudDogNCxcclxuICAgIG1heGVycjogNTAsXHJcbiAgICB3aGl0ZTogdHJ1ZSxcclxuICAgIGJyb3dzZXI6IHRydWUsXHJcbiAgICBkZXZlbDogdHJ1ZSxcclxuICAgIHBsdXNwbHVzOiB0cnVlLFxyXG4gICAgcmVnZXhwOiB0cnVlXHJcbiovXHJcbi8qZ2xvYmFsIFhQYXRoUmVzdWx0ICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhO1xyXG5hdHJvcGEgPSB7fTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoaXMgY2xhc3MgaGFzIGJlZW4gbWFya2VkIGFzIHVuc3VwcG9ydGVkIGFuZCB0aHJvd3MgYW4gXHJcbiAqICBlcnJvciBpZiBpdCBoYXMuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEzMDMwOFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lIFRoZSBuYW1lIG9mIHRoZSBjbGFzcy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yTWVzc2FnZSBPcHRpb25hbC4gQSBjdXN0b20gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdHMgdG9cclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uZXJyb3JcclxuICovXHJcbmF0cm9wYS5zdXBwb3J0Q2hlY2sgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvck1lc3NhZ2UpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgY2xhc3NOYW1lID0gU3RyaW5nKGNsYXNzTmFtZSk7XHJcbiAgICBlcnJvck1lc3NhZ2UgPSBlcnJvck1lc3NhZ2UgfHwgYXRyb3BhLmRhdGFbY2xhc3NOYW1lXS5lcnJvcjtcclxuICAgIGVycm9yTWVzc2FnZSA9IFN0cmluZyhlcnJvck1lc3NhZ2UpO1xyXG4gICAgXHJcbiAgICBpZihhdHJvcGEuZGF0YVtjbGFzc05hbWVdLnN1cHBvcnQgPT09ICd1bnN1cHBvcnRlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIFB1c2hlcyBhIHJlcXVpcmVtZW50IGNoZWNrIGludG8gYXRyb3BhLmRhdGEucmVxdWlyZW1lbnRzLiBUaGUgdGVzdFxyXG4gKiAgdGVzdHMgd2hldGhlciB0aGUgY2xhc3MgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIFNldHNcclxuICogIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0ncyBzdXBwb3J0IHRvIHVuc3VwcG9ydGVkIGFuZCBlcnJvciB0byBlcnJvck1lc3NhZ2VcclxuICogIGlmIHRoZSByZXF1aXJlbWVudEZuIHJldHVybnMgZmFsc2UuIFRoZSByZXF1aXJlbWVudCBjaGVja3Mgd2lsbCBhbGwgYmUgcnVuXHJcbiAqICBhZnRlciB0aGUgbGlicmFyeSBoYXMgbG9hZGVkLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMzAzMDhcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZSBUaGUgbmFtZSBvZiB0aGUgY2xhc3MuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlcXVpcmVtZW50Rm4gQSBmdW5jdGlvbiB0byB0ZXN0IHdoZXRoZXIgb3Igbm90IHRoZSBjbGFzc1xyXG4gKiAgaXMgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuIElmIHN1cHBvcnRlZCwgcmV0dXJucyB0cnVlIG90aGVyd2lzZVxyXG4gKiAgcmV0dXJuIGZhbHNlLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JNZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoaXMgY2xhc3Mgb3IgaXRzXHJcbiAqICBtZXRob2RzIGFyZSBjYWxsZWQgaW4gdW5zdXBwb3J0ZWQgZW52aXJvbm1lbnRzLiBEZWZhdWx0cyB0bzpcclxuICogICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgKyAnIGNsYXNzIGlzIHVuc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnQuJztcclxuICovXHJcbmF0cm9wYS5yZXF1aXJlcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUsIHJlcXVpcmVtZW50Rm4sIGVycm9yTWVzc2FnZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICB2YXIgY2hlY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRlc3QgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2YgY2xhc3NOYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0cm9wYS5yZXF1aXJlcyByZXF1aXJlcyB0aGUgY2xhc3MgbmFtZSB0byBiZSAnICtcclxuICAgICAgICAgICAgICAgICdzcGVjaWZpZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXRyb3BhLmRhdGFbY2xhc3NOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXF1aXJlbWVudEZuICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlbWVudEZuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlIHx8ICdUaGUgYXRyb3BhLicgKyBjbGFzc05hbWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICcgY2xhc3MgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBlbnZpcm9ubWVudC4nO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IHJlcXVpcmVtZW50Rm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGVzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhdHJvcGEuZGF0YVtjbGFzc05hbWVdLmVycm9yID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGF0cm9wYS5kYXRhW2NsYXNzTmFtZV0uc3VwcG9ydCA9ICd1bnN1cHBvcnRlZCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucHVzaChjaGVjayk7XHJcbn07XHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQG5hbWVzcGFjZSBDb250YWluZXIgZm9yIGdvYmFsIGRhdGEgcmVsYXRlZCB0byB0aGUgY2xhc3NlcyBhbmQgZnVuY3Rpb25zLlxyXG4gKi9cclxuYXRyb3BhLmRhdGEgPSB7fTtcclxuXHJcbmF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cyA9IFtdO1xyXG5cclxuYXRyb3BhLm5vcCA9IGZ1bmN0aW9uIG5vcCAoKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuXHJcbiIsIi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGFsbCBHbG9yaW91cyBjbGFzc2VzLCBmdW5jdGlvbnMsIGV0Yy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBhbGwgR2xvcmlvdXMgY2xhc3NlcywgZnVuY3Rpb25zLCBldGMuXHJcbiAqL1xyXG52YXIgYXRyb3BhID0gcmVxdWlyZSgnYXRyb3BhLWhlYWRlcicpO1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZG9jcy92c2RvYy9PcGVuTGF5ZXJzQWxsLmpzXCIvPlxyXG4vKmpzbGludFxyXG4gICAgaW5kZW50OiA0LFxyXG4gICAgbWF4ZXJyOiA1MCxcclxuICAgIHdoaXRlOiB0cnVlLFxyXG4gICAgYnJvd3NlcjogdHJ1ZSxcclxuICAgIGRldmVsOiB0cnVlLFxyXG4gICAgcGx1c3BsdXM6IHRydWUsXHJcbiAgICByZWdleHA6IHRydWVcclxuKi9cclxuLypnbG9iYWwgYXRyb3BhICovXHJcbi8vIGVuZCBoZWFkZXJcclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgZm9yIGZ1bmN0aW9ucyB0aGF0IHRlc3QgdGhlIHN0YXRlIG9mIGlucHV0cy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBuYW1lc3BhY2UgQ29udGFpbmVyIGZvciBmdW5jdGlvbnMgdGhhdCB0ZXN0IHRoZSBzdGF0ZSBvZiBpbnB1dHMuXHJcbiAqIEBzZWUgPGEgaHJlZj1cIi4uLy4uLy4uL0F0cm9wYVRvb2xib3hUZXN0cy5odG1sP3NwZWM9YXRyb3BhLmlucXVpcmVcIj50ZXN0czwvYT5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlID0ge307XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgbnVsbC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IHggQW55IGlucHV0IHRoYXQgbWF5IG9yIG1heSBub3QgYmUgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4ID09PSBudWxsLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNOdWxsID0gZnVuY3Rpb24gKHgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgcmV0dXJuICh4ID09PSBudWxsKTtcclxufTtcclxuLyoqXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBpbnB1dCBpcyBhbiBvYmplY3QuXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxyXG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cclxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxyXG4gKiBAdmVyc2lvbiAyMDEyMDkwOVxyXG4gKiBAcGFyYW0ge01peGVkfSB4IEFueSBpbnB1dCB0aGF0IG1heSBvciBtYXkgbm90IGJlIGFuIG9iamVjdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0eXBlb2YoeCkgPT09ICdvYmplY3QnLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNPYmplY3QgPSBmdW5jdGlvbiAoeCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICByZXR1cm4gKHR5cGVvZiB4ID09PSAnb2JqZWN0Jyk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgaW5wdXQgaXMgYm90aCBhbiBvYmplY3QgYW5kIG5vdCBudWxsLlxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cclxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XHJcbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cclxuICogQHZlcnNpb24gMjAxMjA5MDlcclxuICogQHBhcmFtIHtNaXhlZH0geCBBbnkgaW5wdXQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBib3RoIGFuXHJcbiAqIG9iamVjdCBhbmQgbnVsbC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB4IGlzIGJvdGggYW4gb2JqZWN0IGFuZFxyXG4gKiBub3QgbnVsbC4gKG51bGwgaXMgYW4gb2JqZWN0KS5cclxuICovXHJcbmF0cm9wYS5pbnF1aXJlLmlzT2JqZWN0Tm90TnVsbCA9IGZ1bmN0aW9uICh4KSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIHJldHVybiBhdHJvcGEuaW5xdWlyZS5pc09iamVjdCh4KSAmJiAoIWF0cm9wYS5pbnF1aXJlLmlzTnVsbCh4KSk7XHJcbn07XHJcbi8qKlxyXG4gKiBDaGVja3MgYW4gb2JqZWN0IGZvciB0aGUgZXhpc3RlbmNlIG9mIGEgcHJvcGVydHlcclxuICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZSBwcm9wZXJ0eSB3YXMgaW5oZXJpdGVkXHJcbiAqIG9yIG5vdC5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTIwOTA5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IHdoaWNoIG1heSBvciBtYXkgbm90XHJcbiAqIGhhdmUgdGhlIHByb3BlcnR5IGlkZW50aWZpZWQgYnkgcHJvcC5cclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgQSBzdHJpbmcgdmFsdWUgcmVwcmVzZW50aW5nIHRoZVxyXG4gKiBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBvYmoucHJvcCBleGlzdHMsXHJcbiAqIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaGFzUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgIGlmIChhdHJvcGEuaW5xdWlyZS5pc09iamVjdE5vdE51bGwob2JqKSkge1xyXG4gICAgICAgIHJldHVybiAocHJvcCBpbiBvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4vKipcclxuICogQ2hlY2tzIHdoZXRoZXIgdGhlIGlucHV0IGlzIGFuIGVtcHR5IHN0cmluZy5cclxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XHJcbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxyXG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXHJcbiAqIEB2ZXJzaW9uIDIwMTMwMTE4XHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB5b3Ugd2FudCB0byBrbm93IGFib3V0XHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgc3RyIGlzIGFuIGVtcHR5IHN0cmluZyxcclxuICogIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlLlxyXG4gKi9cclxuYXRyb3BhLmlucXVpcmUuaXNFbXB0eVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgdmFyIG91dCA9IGZhbHNlO1xyXG4gICAgaWYgKCcnID09PSBzdHIpIHtcclxuICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbndoaWxlKGF0cm9wYS5kYXRhLnJlcXVpcmVtZW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHJvcGEuZGF0YS5yZXF1aXJlbWVudHMucG9wKCkoKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGF0cm9wYTtcclxuIl19
;