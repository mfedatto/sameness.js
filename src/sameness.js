/**
 * Sameness.js is exposed throug the Sameness and Ss variables. Almost all
 * routines of Sameness.js
 * @author Maurício Fedatto
 */
var Sameness = (function() {
    /* <==  P R I V A T E   M E M B E R S  ==> */

    /**
     * Collects the object properties and returns them an array of strings
     * @param {*} o Any object
     * @author Maurício Fedatto
     * @example
     * var a = { p1: "x", p2: "y", p3: "z" };
     * 
     * getProps(a); // [ "p1", "p2", "p3" ]
     */
    function getProps(o) {
        var op = []; for (var p in o) op.push(p); return op;
    }

    /**
     * Checks if the given argument is an object
     * @param {*} o Any object
     * @author Maurício Fedatto
     * @example
     * var a = [];
     * var b = {};
     * var c = -1;
     * 
     * isObject(a); // true
     * isObject(b); // true
     * isObject(c); // false
     */
    function isObject(o) {
        return (o instanceof Object);
    }

    /**
     * Checks if the given argument is an array
     * @param {*} o Any object
     * @author Maurício Fedatto
     * @example
     * var a = [];
     * var b = {};
     * var c = -1;
     * 
     * isObject(a); // true
     * isObject(b); // false
     * isObject(c); // false
     */
    function isArray(o) {
        return (o instanceof Array);
    }

    /**
     * Checks if the given argument is an object and not an array
     * @param {*} o Any object
     * @author Maurício Fedatto
     * @example
     * var a = [];
     * var b = {};
     * var c = -1;
     * 
     * isObject(a); // false
     * isObject(b); // true
     * isObject(c); // false
     */
    function isObjectNotArray(o) {
        return (isObject(o) && !isArray(o));
    }
    
    /* <==  P U B L I C   M E M B E R S  ==> */

    this.about = "Sameness.js is a pure JavaScript object comparing library." +
        "It has the capability to check if objects a and b are: the same " +
        "object (isSame); identic objects (isIdentical); equivalent objects " +
        "(isEquivalent); and b a subset of a (isSubset)";

    /**
     * Checks if a and b objects are the same object. As being the same meaning
     * they both reffer to the same instance of an object.
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @author Maurício Fedatto
     * @example
     * var a = { p: 1 };
     * var b = { p: 1 };
     * var c = a;
     * 
     * Ss.isSame(a, b); // false
     * Ss.isSame(a, c); // true
     */
    this.isSame = function(a, b) {
        var cr = (a === b);
        
        return cr;
    };

    /**
     * Checks if a and b objects are identic objects. As being identic meaning
     * they both have the same properties and data, even if they doesn't share
     * the same instance or type. Very usefull for anonymous objects.
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @author Maurício Fedatto
     * @example
     * var a = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
     * var b = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
     * var c = { p1: 9, p2: [ 5, 4, 3, 2, 1 ] };
     * 
     * Ss.isIdentical(a, b); // true
     * Ss.isIdentical(b, c); // false
     */
    this.isIdentical = function(a, b) {
        var cr;

        cr = (a == b);

        if (!cr) {
            if (isObjectNotArray(a) && isObjectNotArray(b)) {
                var ap = getProps(a);
                var bp = getProps(b);

                if (ap.length == bp.length && ap.length + bp.length > 0) {
                    cr = true;

                    for (var i = 0; i < ap.length; i++) {
                        if (ap[i] != bp[i] ||
                            !this.isEquivalent(a[ap[i]], b[bp[i]])) {
                            cr = false;
                            break;
                        }
                    }
                }
            }
            else {
                if (a.length == b.length && a.length + b.length > 0) {
                    cr = true;

                    for (var j = 0; j < a.length; j++) {
                        if (!this.isEquivalent (a[j], b[j], c)) {
                            cr = false;
                            break;
                        }
                    }
                }
            }
        }

        return cr;
    };

    /**
     * Checks if a and b objects are equivalent to eachother. As being
     * equivalent meaning that they may not share identical structures but both
     * have the same properties and data, even if its properties and array items
     * aren't in the same sequence. Being equivalent mean a and b probably
     * represents the same thing but each one was generated differently.
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @author Maurício Fedatto
     * @example
     * var a = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
     * var b = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
     * var c = { p1: 9, p2: [ 5, 4, 3, 2, 1 ] };
     * var d = { p1: [ 5, 4, 3, 2, 1 ], p2: 9 };
     * var e = { p2: [ 5, 4, 3, 2, 1 ], p1: 9 };
     * 
     * Ss.isIdentical(a, b); // true
     * Ss.isIdentical(b, c); // true
     * Ss.isIdentical(c, d); // false
     * Ss.isIdentical(d, e); // true
     */
    this.isEquivalent = function(a, b) {
        var cr;

        cr = (a == b);

        if (!cr) {
            if (isObjectNotArray(a) && isObjectNotArray(b)) {
                var ap = getProps(a);
                var bp = getProps(b);
                var apBuffer = [];
                var bpBuffer = [];

                for (var i = 0; i < ap.length; i++) apBuffer.push(ap[i]);
                for (var j = 0; j < bp.length; j++) bpBuffer.push(bp[j]);

                cr = true;

                while (apBuffer.length > 0) {
                    var watchingAp = apBuffer.pop();
                    var skippedBp = [];
                    var foundP = false;

                    for (var k = 0; k < bpBuffer.length; k++) {
                        var watchingBp = bpBuffer[k];

                        if (!foundP &&
                            (a[watchingAp] == b[watchingBp] ||
                                this.isEquivalent(a[watchingAp],
                                    b[watchingBp]))) {
                            foundP = true;
                        }
                        else {
                            skippedBp.push(watchingBp);
                        }
                    }

                    if (!foundP) {
                        cr = false;
                        break;
                    }

                    bpBuffer = skippedBp;
                }
            }
            else {
                var aBuffer = [];
                var bBuffer = [];

                for (var l = 0; l < a.length; l++) aBuffer.push(a[l]);
                for (var m = 0; m < b.length; m++) bBuffer.push(b[m]);

                cr = true;

                while (aBuffer.length > 0) {
                    var watchingA = aBuffer.pop();
                    var skippedB = [];
                    var found = false;

                    for (var n = 0; n < bBuffer.length; n++) {
                        var watchingB = bBuffer[n];

                        if (watchingA == watchingB && !found) {
                            found = true;
                        }
                        else {
                            skippedB.push(watchingB);
                        }
                    }

                    if (!found) {
                        cr = false;
                        break;
                    }

                    bBuffer = skippedB;
                }
            }
        }

        return cr;
    };

    this.isSubset = function(a, b) {
        throw { message: "Not implemented yet!" };
    };

    return this;
})();

var Ss = Sameness;

var a = { p1: "x", p2: [ "z", "z", -1 ] };
var b = { p2: [ "z", -1, "z" ], p1: "x" };
var c = a;

console.log(Ss.isEquivalent(a, b));