function MutaCache(copyFn) {
}
var cache = {};

function simpleCopy(val) {
  // This doesn't handle functions, and possibly other objects
  return JSON.parse(JSON.stringify(val));
}

function isArray(val) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

function objectCopy(val) {
  if (val && typeof val === 'object') {
    var copy = isArray(val) ? [] : {};
    for (var i in val) {
      copy[i] = this.deepCopy(val[i]);
    }
    return copy;
  }
  else {
    return val;
  }
};

MutaCache.prototype.has = function(key) {
  return this.hasOwnProperty(key);
};

MutaCache.prototype.get = function(key) {
  var val = this[key];
  return this.deepCopy(val);
};

MutaCache.prototype.put = function(key,value) {
  return this[key] = this.deepCopy(value);
};

module.exports = function(opts) {
  if (opts && opts.cacheFunctions) {
    return new MutaCache(objectCopy);
  } else {
    return new MutaCache(simpleCopy);
  }
}
