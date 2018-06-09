var Sameness = (function() {
    /* <==  P R I V A T E   M E M B E R S  ==> */
    
    function _run(f, a, t, c) {
        function _audit(m) {
            this.tk.ad(m, c);
        }

        function _debug(m) {
            this.tk.db("Ss => method: " + c.gF() + "; " + m, c);
        }
        
        var cr = null;

        _debug("incrementing context stack index.");

        c.iSI();
        
        _audit(c.gF() + "(" + this.tk.oS(c.gA()) + ")");
        _debug("args: " + this.tk.oS(c.gA()) + ";");

        cr = f.apply(t, a);

        _debug("args: " + this.tk.oS(c.gA()) + "; result: " + this.tk.oS(cr) + ";");
        _audit(c.gF() + "(" + this.tk.oS(c.gA()) + ") :: " + cr);

        return cr;
    }

    function _isSame(a, b, c) {
        var cr = (a === b);
        
        return cr;
    }

    /**
     * Verifies if two objects are identical
     * @param {*} a first object from comparing pair
     * @param {*} b second object from comparing pair
     * @param {Sameness.context} c Sameness context instance
     * @description
     * cr: current result;
     * ap: {a} properties;
     * ab: {b} properties;
     */
    function _isIdentic(a, b, c) {
        function _audit(m) {
            this.tk.ad("Ss.iI => " + m, c);
        }
        
        function _debug(m) {
            this.tk.db("Ss.iI => " + m, c);
        }

        var cr;

        cr = (a == b);

        if (cr) {
            _audit("comparing arguments are not objects neither array.");
            _debug("comparing arguments are not objects neither array.");
        }
        else {
            if (this.tk.iONA(a) && this.tk.iONA(b)) {
                _audit("comparing arguments are objects but not array.");
                _debug("comparing arguments are objects but not array.");

                var ap = this.tk.gP(a, c);
                var bp = this.tk.gP(b, c);

                if (ap.length == bp.length && ap.length + bp.length > 0) {
                    _audit("comparing arguments has the same properties count.");
                    _debug("comparing arguments has the same properties count.");

                    cr = true;

                    for (var i = 0; i < ap.length; i++) {
                        if (ap[i] != bp[i] || !this.iI(a[ap[i]], b[bp[i]], c)) {
                            cr = false;
                            break;
                        }
                    }
                }
            }
            else {
                if (a.length == b.length && a.length + b.length > 0) {
                    _audit("comparing arguments are array.");
                    _debug("comparing arguments are array.");

                    cr = true;

                    for (var j = 0; j < a.length; j++) {
                        if (!this.iI(a[j], b[j], c)) {
                            cr = false;
                            break;
                        }
                    }
                }
                else {
                    _audit("comparing arguments are not objects neither array.");
                    _debug("comparing arguments are not objects neither array.");
                }
            }
        }

        return cr;
    }
    
    /* <==  P U B L I C   M E M B E R S  ==> */

    this.isSame = function(a, b, c) {
        c = new this.ctx("isSame", [ a, b ], c);
        
        return _run(_isSame, [ a, b, c ], this, c);
    };
    this.iS = this.isSame;

    this.isIdentic = function(a, b, c) {
        c = new this.ctx("isIdentic", [ a, b ], c);
        
        return _run(_isIdentic, [ a, b, c ], this, c);
    };
    this.iI = this.isIdentic;

    this.isEquivalent = function(a, b) {
        throw { message: "Not implemented yet!" };
    };
    this.iEv = this.isEquivalent;

    this.isSubset = function(a, b) {
        throw { message: "Not implemented yet!" };
    };
    this.iSb = this.isSubset;

    this.isSuperset = function(a, b) {
        throw { message: "Not implemented yet!" };
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

        this.isObject = function(o) { return (o instanceof Object); };
        this.iO = this.isObject;

        this.isArray = function(o) { return (o instanceof Array); };
        this.iA = this.isArray;

        this.isObjectNotArray = function(o) { return (this.tk.iO(o) && !this.tk.iA(o)); };
        this.iONA = this.isObjectNotArray;

        this.isNotObjectNeitherArray = function(o) { return !(this.tk.iO(o) || this.tk.iA(o)); };
        this.iNONA = this.isNotObjectNeitherArray;

        this.log = function(c) { console.log(c); };
        this.lg = this.log;

        this.debug = function(m, c) {
            if (this.st.vb.hDL()) {
                var sufix = "[DBG:" +
                    c.gT() +
                    ":" +
                    this.tk.tx.pL(c.gSI().toString(16).toUpperCase(),
                        "0",
                        5) +
                    "] ";
                
                this.out(sufix + m);
            }
        };
        this.db = this.debug;

        this.audit = function(m, c) {
            if (this.st.vb.hAL() && !this.st.vb.hDL()) {
                var sufix = "[AUD:" +
                    c.gT() +
                    ":" +
                    this.tk.tx.pL(c.gSI().toString(16).toUpperCase(),
                        "0",
                        5) +
                    "] ";
                
                this.out(sufix + m);
            }
        };
        this.ad = this.audit;

        this.objectString = function(c) {
            if (this.tk.iO(c)) { c = JSON.stringify(c); }
            
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

        this.getTimestamp = function() { return timestamp; };
        this.gT = this.getTimestamp;

        this.getStackIndex = function() { return stackIndex; };
        this.gSI = this.getStackIndex;

        this.incrementStackIndex = function() { stackIndex++; };
        this.iSI = this.incrementStackIndex;

        this.getFunction = function() { return f; };
        this.gF = this.getFunction;

        this.getArguments = function() { return a; };
        this.gA = this.getArguments;

        return this;
    });
    this.ctx = this.context;

    this.settings = (function() {
        this.verbosity = (function() {
            var level = 0;
            var quietLevel = 0;
            var errorLevel = 10;
            var warningLevel = 20;
            var infoLevel = 30;
            var auditLevel = 40;
            var debugLevel = 50;

            this.setQuietLevel = function() {
                level = quietLevel;
            };
            this.sQL = this.setQuietLevel;

            this.setErrorLevel = function() {
                level = errorLevel;
            };
            this.sEL = this.setErrorLevel;

            this.setWarningLevel = function() {
                level = warningLevel;
            };
            this.sWL = this.setWarningLevel;

            this.setInfoLevel = function() {
                level = infoLevel;
            };
            this.sIL = this.setInfoLevel;

            this.setAuditLevel = function() {
                level = auditLevel;
            };
            this.sAL = this.setAuditLevel;

            this.setDebugLevel = function() {
                level = debugLevel;
            };
            this.sDL = this.setDebugLevel;

            this.isQuietLevel = function() {
                return (level == quietLevel);
            };
            this.iQL = this.isQuietLevel;

            this.isErrorLevel = function() {
                return (level == errorLevel);
            };
            this.iEL = this.isErrorLevel;

            this.isWarningLevel = function() {
                return (level == warningLevel);
            };
            this.iWL = this.isWarningLevel;

            this.isInfoLevel = function() {
                return (level == infoLevel);
            };
            this.iIL = this.isInfoLevel;

            this.isAuditLevel = function() {
                return (level == auditLevel);
            };
            this.iAL = this.isAuditLevel;

            this.isDebugLevel = function() {
                return (level == debugLevel);
            };
            this.iDL = this.isDebugLevel;

            this.hasQuietLevel = function() {
                return (level == quietLevel);
            };
            this.hQL = this.hasQuietLevel;

            this.hasErrorLevel = function() {
                return (level >= errorLevel);
            };
            this.hEL = this.hasErrorLevel;

            this.hasWarningLevel = function() {
                return (level >= warningLevel);
            };
            this.hWL = this.hasWarningLevel;

            this.hasInfoLevel = function() {
                return (level >= infoLevel);
            };
            this.hIL = this.hasInfoLevel;

            this.hasAuditLevel = function() {
                return (level >= auditLevel);
            };
            this.hAL = this.hasAuditLevel;

            this.hasDebugLevel = function() {
                return (level >= debugLevel);
            };
            this.hDL = this.hasDebugLevel;

            this.getVerbosityLevel = function() {
                var cr = "Quiet";
                
                switch (level) {
                    case 10: cr = "Error"; break;
                    case 20: cr = "Warning"; break;
                    case 30: cr = "Info"; break;
                    case 40: cr = "Audit"; break;
                    case 50: cr = "Debug"; break;
                }

                return cr;
            };
            this.gVL = this.getVerbosityLevel;

            return this;
        })();
        this.vb = this.verbosity;

        return this;
    })();
    this.st = this.settings;

    this.out = function(m) {
        console.log(m);
    };

    return this;
})();

var Ss = Sameness;

var a = { p: 1, p2: [ 3, 5 ] };
var b = { p: 1, p2: [ 3, 2 ] };
var c = a;

Ss.st.vb.sDL();

console.log(Ss.isIdentic(a, b));