MutaCache
=========

##### A cache for mutable javascript data structures.

Do you want to cache an object and then mutate it without affecting the cache? Yes? Then this is the cache for you.

## The Problem

Should this happen?

```javascript
NODE> cache.put('x', {a: 'a', b: 'b', c: 'c'})
{ a: 'a', b: 'b', c: 'c' }
NODE> cache.get('x')
{ a: 'a', b: 'b', c: 'c' }
NODE> var theValueNow = cache.get('x')
NODE> delete theValueNow.a
true
NODE> delete theValueNow.b
true
NODE> delete theValueNow.c
true
NODE> theValueNow.lol = true
true
NODE> cache.get('x')
{ lol: true }
```

I don't think so. This cache won't do that.

## Install

`npm install mutacache --save`

## Usage

The simplest case, storing a primitive:

```javascript

var cache = require('mutacache')();

cache.put('key', 'value');
if (cache.has('key')) {
  cache.get('key'); // returns 'value'
}
```

Storing an object:

```javascript

var cache = require('mutacache')();

cache.put('key', {a:'a', b:'b', c:'c'});
if (cache.has('key')) {
  var x = cache.get('key');  //returns {a:'a', b:'b', c:'c'}
  x.a = 'lol';
  cache.get('key');  // still returns {a:'a', b:'b', c:'c'}
}
```

### Options

The mutacache function takes an object of options,

* `cacheFunctions` A boolean, defines whether functions should be cached. Default `false`.

#### Caching Functions

Caching functions is useful, but it's use invokes an alternate copying mechanism that has performance penalties.

> This is probably applicable for more than Function types.

```javascript

var nonFnCacher = require('mutacache')();
var fnCacher = require('mutacache')({cacheFunctions:true});

function abc() {
  // something important here
}

nonFnCacher.put('key', {a:'a', fn:abc});
if (nonFnCacher.has('key')) {
  var x = nonFnCacher.get('key');  //returns {a:'a'}
}

fnCacher.put('key', {a:'a', fn:abc});
if (fnCacher.has('key')) {
  var x = fnCacher.get('key');  //returns {a:'a', fn:abc}
}
```

### Limitations

This cache copies values on insertion and retrieval, and Javascript data structures aren't really built for that. Don't use this if you're looking for raw speed.

And, some TODOs:

* Add cache busting
* TTLs


## License

Copyright © 2014 Dan Midwood

Distributed under the Apache License, Version 2.0
