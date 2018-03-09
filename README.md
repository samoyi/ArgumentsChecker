# ArgumentsChecker
*Make sure a function accepts expected parameters with correct amount and types*


## Usage
### Create an instance:
```js
const checker = new ArgumentsChecker();
```

### `get` method
Get `arguments` object or rest parameters
```js
function foo(){
    checker.get(arguments);
}
// or
let bar = (...args)=>{
    checker.get(args);
};
```

### `amount` method
Specify minimun amount of arguments
```js
let bar = (...args)=>{
    checker.get(args).amount(4); // At least 4 arguments
};
```

### `types` method
* Specify types of arguments.
* Argument of `types` must be a type string or `null`.
    * If a string, it must be a value returned by the method below, case
        insensitive:
        ```js
            Object.prototype.toString.call(checked).slice(8, -1)
        ```
        Like `'string'`, `'Array'` or `'OBJECT'` are all valid.
    * A `null` means it can accept any type of argument.
* Number type does not include `NaN`
```js
let bar = (...args)=>{
     // The first argument must be an array
     // The second argument must be a string
     // The third argument can be any type
     // The fouth argument must be a number
    checker.get(args).types(['array', 'String', null, 'NUMBER']);
    // ...
};
bar([1], '1', {}, 1, false); // No error
bar([1], 1, '1') // TypeError
bar([1], '1', {}) // TypeError. The fouth argument is undefine.
bar([1], '1', {}, NaN); // TypeError
```

### Custom types
You can customize the types of parameters you expect, in the form below:
```js
// Define a custom types object, whose method names are custom types.
// A method should return true if the given argument is expected.
const oCustomChecker = {
    strArr(arg){ // argument must be an array whose items are all string.
        if(!Array.isArray(arg) || arg.length===0){
            return false;
        }
        return arg.every(item=>typeof item === 'string');
    },
    numArr(arg){ // argument must be an array whose items are all number.
        if(!Array.isArray(arg) || arg.length===0){
            return false;
        }
        return arg.every(item=>typeof item === 'number'
                            && !Number.isNaN(item));
    }
};
const checker = new ArgumentsChecker(oCustomChecker); // Pass into constructor
let bar = (...args)=>{
    checker.get(args).types('string', 'strArr', 'numArr');
};
bar('1', ['1', '2'], [1, 2]); // No error
bar('1', [1, 2], ['1', '2']); // TypeError
bar('1', [], [1, 2]); // TypeError
```

### Check amount and types at the same time
Like this:
```js
checker.get(args).amount(5).types(['number', null, 'array', 'numArr']);
```
