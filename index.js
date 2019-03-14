fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    copyCollectionAsArray: function(collection) {
      return collection instanceof Array ? collection.slice() : Object.values(collection);
    },

    each: function(collection, fn) {
      const collectionCopy = this.copyCollectionAsArray(collection);
      
      for (const [i, v] of collectionCopy.entries()) fn(v, i, collectionCopy);

      return collection;
    },

    map: function(collection, fn) {
      const collectionCopy = this.copyCollectionAsArray(collection);
      
      const returnCollection = [];
      for (const [i, v] of collectionCopy.entries()) returnCollection.push(fn(v, i, collectionCopy));

      return returnCollection;
    },

    reduce: function (collection, fn, acc = null) {
      const collectionCopy = this.copyCollectionAsArray(collection);
      
      let i = 1;
      if (acc === null) acc = collectionCopy[0];
      else i = 0;
      
      for (; i < collectionCopy.length; i++) acc = fn(acc, collectionCopy[i], collectionCopy);

      return acc;
    },
    
    find: function(collection, fn) {
      const collectionCopy = this.copyCollectionAsArray(collection);
      
      for (const v of collectionCopy) {
        if (fn(v)) return v;
      }

      return undefined;
    },

    filter: function(collection, fn) {
      let collectionCopy = this.copyCollectionAsArray(collection);
      const filtered = [];

      for (const v of collectionCopy) {
        if (fn(v)) filtered.push(v);
      }

      return filtered;
    },

    size: function(collection) {
      return this.copyCollectionAsArray(collection).length;
    },

    first: function(arr, n = 1) {
      if (n < 2) return arr[0];

      return arr.slice(0, n);
    },

    last: function(arr, n = 1) {
      if (n < 2) return arr[arr.length - 1];

      return arr.slice(-n);
    },

    compact: function(array) {
      return this.filter(array, (v) => !!v);
    },

    sortBy: function(array, fn) {
      const arrayCopy = array.slice();

      return arrayCopy.sort((a, b) => fn(a) - fn(b));
    },

    flatten: function(array, shallowFlatten) {
      if (shallowFlatten) return [].concat(...array);
      
      const arrayCopy = array.slice();
      return flattenArray(arrayCopy);

      function flattenArray(array) {
        let flat = [];
        for (const val of array) {
          if (val instanceof Array) {
            flat = flat.concat(flattenArray(val));
          } else flat.push(val);
        }
        return flat;
      }
    },

    uniq: function(array, isSorted = false, fn = null) {
      let arrayCopy = array.slice();
      if (!isSorted) arrayCopy = arrayCopy.sort((a, b) => a - b);
      
      let uniqVal = {};
      if (!fn) {
        return this.filter(arrayCopy, (v) => 
          uniqVal[v] ? false : ((uniqVal[v] = true), true));
      } else {
        return this.filter(arrayCopy, (v) => 
          uniqVal[fn(v)] ? false : ((uniqVal[fn(v)] = true), true));
      }
    },

    keys: function(object) {
      return Object.keys(object);
    },

    values: function(object) {
      return Object.values(object);
    },

    functions: function(object) {
      return this.filter(this.keys(object), (v) =>
        typeof object[v] === "function" ? true : false)
    },

    giveMeMore: function() {
      return true;
    }
  }
})()

fi.libraryMethod()

const objA = {a: 1, b: 2}
const objB = objA
const objC = {c: 3, d: 4}
console.log(fi.uniq([objA, objB, objC]));
