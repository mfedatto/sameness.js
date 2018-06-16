
# Sameness.js

Sameness.js is a pure JavaScript object comparing library. It has the capability
to check if objects ```a``` and ```b``` are:

- [x] The same object (see [isSame](#issame))
- [x] Identic objects (see [isIdentical](#isidentical))
- [ ] Equivalent objects (see [isEquivalent](#isequivalent))
- [ ] ```b``` a subset of ```a``` (see [isSubset](#issubset))

## ```Sameness```/```Ss```

Sameness.js is exposed throug the ```Sameness``` and ```Ss``` variables.
Almost all routines of Sameness.js.

### ```isSame```

Checks if ```a``` and ```b``` objects are the same object. As being the same
meaning they both reffer to the same instance of an object.

### ```isIdentical```

Checks if ```a``` and ```b``` objects are identical objects. As being identical
meaning they both have the same properties and data, even if they doesn't
share the same instance or type. Very usefull for anonymous objects.

### ```isEquivalent```

Checks if ```a``` and ```b``` objects are equivalent to eachother. As being
equivalent meaning that they may not share identical structures but both have
the same properties and data, even if its properties and array items aren't in
the same sequence. Being equivalent mean ```a``` and ```b``` probably represents
the same thing but each one was generated differently.

### ```isSubset```

Cheks if ```b``` object is a subset of ```a``` object. As being a subset meaning
all its properties and its data are completelly covered by the superset, but not
meaning reciprocal is true.
