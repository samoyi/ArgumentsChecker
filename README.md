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
```

*Console:*
```
ArgumentsChecker: Expects at least 5 arguments, 4 given.
 Error
    at foo (//path2file/test.html:15:28)
    at //path2file/test.html:18:1

ArgumentsChecker: argument 0 expects number, boolean given.
 Error
    at foo (//path2file/test.html:15:38)
    at //path2file/test.html:18:1

ArgumentsChecker: argument 2 expects array, string given.
 Error
    at foo (//path2file/test.html:15:38)
    at //path2file/test.html:18:1

ArgumentsChecker: argument 3 expects plain object, array given.
 Error
    at foo (//path2file/test.html:15:38)
    at //path2file/test.html:18:1
 ```
