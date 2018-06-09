var Sameness = (function() {
    /* <==  P R I V A T E   M E M B E R S  ==> */
    
    function _run(f, a, t, c) {
        function _debug(m) {
            this.tk.db("_run => method: " + c.gF() + "; " + m, c);
        }
        
        var cr = null;

        c.iSI();
        
        _debug("args: " + this.tk.oS(c.gA()) + ";");

        cr = f.apply(t, a);

        _debug("result: " + this.tk.oS(cr) + ";");

        return cr;
    }

    /**
     * 
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @param {Sameness.context} c Sameness context instance
     * @description
     * cr: current result;
     * ap: {a} properties;
     * ab: {b} properties;
     */
    function _isEqual(a, b, c) {
        var cr;

        cr = (a == b);

        if (!cr) {
            if (this.tk.iONA(a) && this.tk.iONA(b)) {
                var ap = this.tk.gP(a, c);
                var bp = this.tk.gP(b, c);

                if (ap.length == bp.length && ap.length + bp.length > 0) {
                    cr = true;

                    for (var i = 0; i < ap.length; i++) {
                        if (ap[i] != bp[i] || !this.iE(a[ap[i]], b[bp[i]], c)) {
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
                        if (!this.iE(a[j], b[j], c)) {
                            cr = false;
                            break;
                        }
                    }
                }
            }
        }

        return cr;
    }
    
    /* <==  P U B L I C   M E M B E R S  ==> */

    this.isEqual = function(a, b, c) {
        c = new this.ctx("isEqual", [ a, b ], c);
        
        return _run(_isEqual, [ a, b, c ], this, c);
    };
    this.iE = this.isEqual;

    this.isSame = function(a, b) {
        return a === b;
    };
    this.iS = this.isSame;

    this.isEquivalent = function(a, b) {
        return 0;
    };
    this.iEv = this.isEquivalent;

    this.isSubset = function(a, b) {
        return 0;
    };
    this.iSb = this.isSubset;

    this.isSuperset = function(a, b) {
        return 0;
    };
    this.iSp = this.isSuperset;

    this.toolkit = function() {
        function _getProps(o) {
            var op = [];

            for (var p in o) op.push(p);

            return op;
        }
        
        this.getProps = function(o, c) {
            c = new this.ctx("getProps", [ o ], c);
            
            return _run(_getProps, [o, c ], this, c);
        };
        this.gP = this.getProps;

        this.isObject = function(o) {
            return (o instanceof Object);
        };
        this.iO = this.isObject;

        this.isArray = function(o) {
            return (o instanceof Array);
        };
        this.iA = this.isArray;

        this.isObjectNotArray = function(o) {
            return (this.tk.iO(o) && !this.tk.iA(o));
        };
        this.iONA = this.isObjectNotArray;

        this.isNotObjectNeitherArray = function(o) {
            return !(this.tk.iO(o) || this.tk.iA(o));
        };
        this.iNONA = this.isNotObjectNeitherArray;

        this.log = function(c) {
            console.log(c);
        };
        this.lg = this.log;

        this.debug = function(m, c) {
            var sufix = "[DBG:" +
                c.gT() +
                ":" +
                this.tk.tx.pL(c.gSI().toString(16).toUpperCase(),
                    "0",
                    5) +
                "] ";
            
            console.log(sufix + m);
        };
        this.db = this.debug;

        this.objectString = function(c) {
            if (this.tk.iO(c)) {
                c = JSON.stringify(c);
            }
            
            return c;
        };
        this.oS = this.objectString;

        this.text = function() {
            this.padLeft = function(t, p, l) {
                var cr = String(t);
                var pFLT = l - cr.length;
                
                if (pFLT > 0) {
                    var pF = "";

                    while (pF.length < pFLT) pF += p;
                    
                    cr = pF + cr;
                }
                
                cr = cr.substring(cr.length - l);

                return cr;
            };
            this.pL = this.padLeft;

            return this;
        }();
        this.tx = this.text;

        return this;
    }();
    this.tk = this.toolkit;

    /**
     * 
     * @param {function} f Calling function
     * @param {array} a Arguments array
     * @param {Sameness.context} c Parent context object
     */
    this.context = (function(f, a, c) {
        var timestamp;
        var stackIndex = 0;

        (function() {
            var currentDate = new Date();
            var timestampString = currentDate.getUTCFullYear() +
                this.tk.tx.pL((currentDate.getUTCMonth() + 1), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCDate(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCHours(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCMinutes(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCSeconds(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCMilliseconds(), "0", 2);
            var timestampNumber = Number(timestampString);
            var timestampHexa = timestampNumber.toString(16).toUpperCase();

            timestamp = "UTC" + timestampHexa;
            
            if (c !== undefined) stackIndex = c.gSI();
        })();

        this.info = "Sameness.context";

        this.getTimestamp = function() {
            return timestamp;
        };
        this.gT = this.getTimestamp;

        this.getStackIndex = function() {
            return stackIndex;
        };
        this.gSI = this.getStackIndex;

        this.incrementStackIndex = function() {
            stackIndex++;
        };
        this.iSI = this.incrementStackIndex;

        this.getFunction = function() {
            return f;
        };
        this.gF = this.getFunction;

        this.getArguments = function() {
            return a;
        };
        this.gA = this.getArguments;

        return this;
    });
    this.ctx = this.context;

    return this;
})();

var Ss = Sameness;

var a = { p: 1, p2: [ 3, 2 ] };
var b = { p: 1, p2: [ 3, 2 ] };
var c = a;

console.log(Ss.isSame(a, b));