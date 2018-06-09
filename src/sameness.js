var Sameness = function() {
    /* <==  P R I V A T E   M E M B E R S  ==> */
    
    /**
     * 
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @param {Sameness.context} ctx Sameness context instance
     * @description
     * cr: current result;
     * ap: {a} properties;
     * ab: {b} properties;
     */
    function _isEqual(a, b, ctx) {
        var cr;

        ctx.iSI();

        cr = (a == b);

        this.tk.db(this.tk.iS.kV("cr", cr) + " Ss.iE(" + a + ", " + b + ", " + this.tk.iS.st(ctx) + ")");

        if (!cr) {
            var ap = this.tk.gP(a);
            var bp = this.tk.gP(b);

            this.tk.db(this.tk.iS.kV("cr", cr) + " Ss.iE(" + a + ", " + b + ", " + this.tk.iS.st(ctx) + ") :: " + this.tk.iS.kV("ap.length", ap.length) + " == " + this.tk.iS.kV("bp.length", bp.length) + " :: " + (ap.length == bp.length) + " // " + this.tk.iS.kV("ap.length + bp.length > 0", ap.length + bp.length > 0));
            
            if (ap.length == bp.length && ap.length + bp.length > 0) {
                cr = true;

                for (var i = 0; i < ap.length; i++) {
                    if (ap[i] != bp[i] || !this.iE(a[ap[i]], b[bp[i]], ctx + 1)) {
                        cr = false;
                        break;
                    }
                }
            }
        }

        return cr;
    }
    
    /* <==  P U B L I C   M E M B E R S  ==> */

    this.isEqual = function(a, b) {
        var ctx = new this.ctx("isEqual");
        
        return _isEqual(a, b, 0);
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
                return "[Ss[" + c + "]]";
            };
            this.v = this.value;
            
            this.keyValue = function(k, v) {
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
                var cr = t;
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

    this.context = function(r, a, sI) {
        var timestamp = t;
        var stackIndex = sI;

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

        return this;
    };
    this.ctx = this.context;

    return this;
}();

var Ss = Sameness;

var a = { p: 1 };
var b = { p: 1, w: 2 };
var c = a;

console.log(Ss.isEqual(a, b));