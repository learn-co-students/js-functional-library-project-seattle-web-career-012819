fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callBack) {
        const answer = (collection instanceof Array) ? [...collection] : Object.values(collection)

        for (let i = 0; i < answer.length; i++)
          callBack(answer[i])

        return collection
      },

    map: function(collection, callBack) {
         !(collection instanceof Array) ? collection =  Object.values(collection) : collection = collection

         const answer = []
        for (let i = 0; i < collection.length; i++)
          answer.push(callBack(collection[i]))

        return answer
      },

    reduce: function(array = [], callback = () => {}, acc) {

			if (!acc) {
				acc = array[0]
				array = array.slice(1)
			}
			for (let i = 0; i < array.length; i++) {
				acc = callback(acc, array[i], array)
			}
			return acc;
		},


    find: function(collection, predicate) {
      !(collection instanceof Array) ? collection =  Object.values(collection) : collection = collection

      for(let i = 0; i < collection.length; i++){
        if(predicate(collection[i])){
          return collection[i]
        }
      }
    },
    filter: function(collection, predicate) {
      !(collection instanceof Array) ? collection =  Object.values(collection) : collection = collection
      let answer = []
      for(let i = 0; i < collection.length; i++){
        if(predicate(collection[i])){
          answer.push(collection[i])
        }
      }
      return answer
    },

    size: function(collection){
      !(collection instanceof Array) ? collection =  Object.values(collection) : collection = collection

      return collection.length
    },

    first: function(collection, n =1){
      !(collection instanceof Array) ? collection =  Object.values(collection) : collection = collection
      if(n==1){
        return collection[0]
      } else{
        return collection.slice(0,n)
      }
    },

    last: function(collection,n = -1){

      if(n == -1){
        return collection[collection.length-1]
      } else {
        return collection.slice(collection.length-n, collection.length)
      }

    },

    compact: function(collection){
      let answer = []
      for(let i = 0; i < collection.length; i++){
        if(collection[i]){
          answer.push(collection[i])
        }
      }
      return answer
    },

    sortBy: function(collection, callback){
      let answer = [...collection]
      return answer.sort(function(a,b){
        return  callback(a)-callback(b)
      })

    },
    // flatten: function(arr, shallow = false){
    //   let answer = []
    //   let counter = 0
    //     function loop(array){
    //       array.forEach(item => {
    //         if (item instanceof Array){
    //           loop(item);
    //         } else {
    //           answer.push(item)
    //         }
    //       })
    //       return answer
    //     }
    //   return loop(arr);
    // },


keys: function(obj){
  let array = []
  for (let key in obj){
    array.push(key)
  }
  return array
},

values: function(obj){
  let array = []
  for (let key in obj){
    array.push(obj[key])
  }
  return array
},

functions: function(obj){
  let array = []
  for (let key in obj){
    if (typeof obj[key] == 'function'){
      array.push(key)
    }
  }
  return array.sort()
},

// below functions from solution

unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },
uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },



  }
})()

fi.libraryMethod()
