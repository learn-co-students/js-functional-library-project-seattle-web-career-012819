fi = (function() {
  return {
    ArrayFunc: function(func1, func2, data, ...args) {
      if (data && data.constructor === Array) {
        return func1(data, ...args);
      } else if (data && data.constructor === Object) {
        return func2(data, ...args);
      }
    },

    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(data, msg) {
      function arr(data, msg) { data.forEach(function() { msg(this) }) };
      function obj(data, msg) { for(key in data) { msg(data[key]) } };
      
      this.ArrayFunc(arr, obj, data, msg);

      return data;
    },

    map: function(data, func) {
      function arr(data, func) { return data.map(func) };
      function obj(data, func) {
        let result = [];
        for (key in data) {
          result.push(data[key]);
        }
        return result.map(func);
      }

      return this.ArrayFunc(arr, obj, data, func);
    },

    reduce: function(data, func, num) {
      return !!num ? data.reduce(func, num) : data.reduce(func);
    },
    
    find: function(data, matchVal) {
      function arr(data, matchVal) {
        let result = data.find(matchVal);
        return (result) ? result : undefined;
      }
      function obj(data, matchVal) {
        let result = data[matchVal];
        return (result) ? result : undefined;
      }

      return this.ArrayFunc(arr, obj, data, matchVal);
    },

    filter: function(data, func) {
      function arr(data, func) { return data.filter(func) };
      function obj(data, func) {
        let result = [];
        for (key in data) {
          result.push(data[key]);
        }
        return result.filter(func);
      };

      return this.ArrayFunc(arr, obj, data, func);
    },

    size: function(data) {
      function arr(data) { return data.length };
      function obj(data) { return Object.keys(data).length };

      return this.ArrayFunc(arr, obj, data);
    },

    first: function(data, num) {
      let lastIdx = (num) ? num : 1;
      let result = data.slice(0, lastIdx)
      return (num) ? result : result[0];
    },

    last: function(data, num) {
      let firstIdx = (num) ? data.length - num : data.length - 1;
      let result = data.slice(firstIdx, data.length);
      return (num) ? result : result[0];
    },

    compact: function(data) {
      return data.slice().filter(i => !!i);
    },

    sortBy: function(data, func) {
      return data.slice().sort(function(a, b) {
        return func(a) - func(b);
      });
    },

    flatten: function(data, flag) {
      function recursivelyFlatten(data) {
        return data.reduce((a, v) =>  Array.isArray(v) ?
                                      a.concat(recursivelyFlatten(v)) :
                                      a.concat(v), []);
      }
      
      let result =  (flag) ?
                    data.reduce((a,v) => a.concat(v), []) :
                    recursivelyFlatten(data);
      return result;
    },

    uniq: function(data, flag=false, conditional=false) {
      function singular(value, index, self) {
        return self.indexOf(value) === index;
      }

      // I shamelessly copied this because... well, just look at it.
      // I made tiny improvements to how return is conducted, but that's it.

      if (flag) {
        result = data.slice().filter(singular);
      } else if (!conditional) {
        result = Array.from(new Set(data));
      } else {
        const modVals = new Set()
        const uniqVals = new Set()
        for (let val of data) {
          const conditionedVal = conditional(val)
          if (!modVals.has(conditionedVal)) {
            modVals.add(conditionedVal)
            uniqVals.add(val)
          }
        }
        result = Array.from(uniqVals)
      }
      return result;
    },

    keys: function(obj) {
      let result = Object.keys(obj).map(function() {
        if (this.constructor === Array || this.constructor === Object) {
          return this;
        }
      });
      return result;
    },

    values: function(obj) {
      let result = [];
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          result.push(obj[key]);
        }
      }
      return result;
    },
    
    functions: function(obj) {
      let result = [];
      for (key in obj) {
        if (obj[key] && typeof obj[key] === 'function') {
          result.push(key);
        }
      }
      return result;
    },

    giveMeMore: function() {
      return !!("more please");
    }

  }
})()

fi.libraryMethod()
