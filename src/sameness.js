var Sameness = function() {
    /* <==  P R I V A T E   M E M B E R S  ==> */
    
    function _run(f, a, t, c) {
        var cr = null;

        c.iSI();
        
        this.tk.db(" _run[stack:" + c.gSI() + "] => method: " + this.tk.iS.v(c.gF()) + "; args: " + this.tk.iS.v(c.gA()) + ";");

        cr = f.apply(t, a);

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
            var ap = this.tk.gP(a);
            var bp = this.tk.gP(b);

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

        return cr;
    }
    
    /* <==  P U B L I C   M E M B E R S  ==> */

    this.isEqual = function(a, b, c) {
        if (c === undefined) c = new this.ctx("isEqual", [ a, b ]);
        
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

    this.toolkit = function() {
        this.getProps = function(o) {
            var op = [];

            for (var p in o) op.push(p);

            return op;
        };
        this.gP = this.getProps;

        this.log = function(c) {
            console.log(c);
        };
        this.lg = this.log;

        this.debug = function(c) {
            console.log("[DEBUG] " + c);
        };
        this.db = this.debug;

        this.infoStrings = function() {
            this.value = function(c) {
                if (c instanceof Object) {
                    c = JSON.stringify(c);
                }
                
                return "[Ss[" + c + "]]";
            };
            this.v = this.value;
            
            this.keyValue = function(k, v) {
                if (v instanceof Object) {
                    v = JSON.stringify(v);
                }
                
                return this.v(k + ": " + v);
            };
            this.kV = this.keyValue;

            this.stack = function(s) {
                return this.kV("stack", s);
            };
            this.st = this.stack;

            return this;
        }();
        this.iS = this.infoStrings;

        this.text = function() {
            this.padLeft = function(t, p, l) {
                var cr = String(t);
                var pFLT = l - t.length;
                
                if (pFLT > 0) {
                    var pF = "";

                    while (pF.length < pFLT) pF += p;

                    cr = p + t;
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
     * @param {number} sI Stack index
     */
    this.context = function(f, a) {
        var timestamp;
        var stackIndex = 0;

        (function() {
            var currentDate = new Date();
            
            timestamp = "UTC-" +
                currentDate.getUTCFullYear() +
                this.tk.tx.pL((currentDate.getUTCMonth() + 1), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCDate(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCHours(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCMinutes(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCSeconds(), "0", 2) +
                this.tk.tx.pL(currentDate.getUTCMilliseconds(), "0", 2);
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
    };
    this.ctx = this.context;

    return this;
}();

var Ss = Sameness;

var a = { p: 1, p2: [ 2, 3 ] };
var b = { p: 1, p2: [ 3, 2 ] };
var c = a;

console.log(Ss.isEqual(a, b));