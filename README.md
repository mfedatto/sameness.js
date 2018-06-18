
# Sameness.js

Sameness.js is a pure JavaScript object comparing library. It has the capability
to check if objects ```a``` and ```b``` are:

- The same object ([isSame](#issame))
- Identical objects ([isIdentical](#isidentical))
- Equivalent objects ([isEquivalent](#isequivalent))
- ```b``` a subset of ```a``` ([isSubset](#issubset))

Sameness.js is exposed throug the ```Sameness``` variable.

## isSame

Checks if ```a``` and ```b``` objects are the same object. As being the same
meaning they both reffer to the same instance of an object.

```javascript
var a = { p: 1 };
var b = { p: 1 };
var c = a;

Sameness.isSame(a, b); // false
Sameness.isSame(a, c); // true
```

## isIdentical

Checks if ```a``` and ```b``` objects are identical objects. As being identical
meaning they both have the same properties and data, even if they doesn't
share the same instance or type. Very usefull for anonymous objects.

```javascript
var a = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
var b = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
var c = { p1: 9, p2: [ 5, 4, 3, 2, 1 ] };

Sameness.isIdentical(a, b); // true
Sameness.isIdentical(b, c); // false
```

## isEquivalent

Checks if ```a``` and ```b``` objects are equivalent to eachother. As being
equivalent meaning that they may not share identical structures but both have
the same properties and data, even if its properties and array items aren't in
the same sequence. Being equivalent mean ```a``` and ```b``` probably represents
the same thing but each one was generated differently.

```javascript
var a = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
var b = { p1: 9, p2: [ 1, 2, 3, 4, 5 ] };
var c = { p1: 9, p2: [ 5, 4, 3, 2, 1 ] };
var d = { p1: [ 5, 4, 3, 2, 1 ], p2: 9 };
var e = { p2: [ 5, 4, 3, 2, 1 ], p1: 9, p3: [] };

Sameness.isEquivalent(a, b); // true
Sameness.isEquivalent(b, c); // true
Sameness.isEquivalent(c, d); // true
Sameness.isEquivalent(d, e); // false
```

## isSubset

Cheks if ```b``` object is a subset of ```a``` object. As being a subset meaning
all its properties and its data are completelly covered by the superset, but not
meaning reciprocal is true.

```javascript
var a = { p1: 9, p2: [ 1, 2, 3, 4, 5, 6, 7 ], p3: "z", p4: { p5: [] } };
var b = { p1: 9, p2: [ 1, 2, 3, 4, 5 ], p3: "z" };
var c = { p1: 9, p2: [ 5, 4, 3, 2, 1 ] };

Sameness.isSubset(a, b); // true
Sameness.isSubset(b, c); // true
Sameness.isSubset(a, c); // true
Sameness.isSubset(b, a); // false
```
