# ArgumentsChecker
*Make sure a function accepts expected parameters with correct amount and types*


## Usage
Create an instance:
```js
const checker = new ArgumentsChecker();
```

Create an instance, an alert will pop up which contains same information as
thrown error in console:
```js
const checker = new ArgumentsChecker(true);
```

Use `get` method to get `arguments` object or rest parameters
```js
function foo(){
    checker.get(arguments);
}
let bar = (...args)=>{
    checker.get(args);
};
```

At least 4 arguments:
```js
checker.get(args).amount(4);
```

The first 2 arguments must be array and string:  
Argument of `types` must be a type string or null  
Number type does not include `NaN`
```js
checker.get(args).types(['array', 'string']);
```

At least 5 arguments, the first must be a number, third must be a string, the
fouth must be a plain object. The second can be any type.
```js
checker.get(args).amount(5).types(['number', null, 'array', 'object']);
```


## Example
```js
const checker = new ArgumentsChecker();

function foo(num, str, arr){
    checker.get(arguments).amount(5).types(['number', null, 'array', 'object']);
}

foo(false, 'NaN', {});
// Error: ArgumentsChecker: Expects at least 5 arguments, 3 given.
```
