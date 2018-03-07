'use strict';

function ArgumentsChecker(oCustomTypes={})
{
	// Get type string of checked with lower case
	const getTypeWithLowerCase = (checked)=>{
		return Object.prototype.toString.call(checked).slice(8, -1)
																.toLowerCase();
	}

	// Stringify arguments array with a readable form, contained in error message.
	const argsToString = ()=>{
		return this.args.map((arg)=>{
			if(typeof arg === 'object'){
				return getTypeWithLowerCase(arg);
			}
			else{
				switch(typeof arg){
					case 'string':     return '"' + arg + '"';
					case 'undefined':  return 'undefined';
					default:           return arg;
				}
			}
		});
	}

	// Throw Error
	let throwErr = null;
	if(Error.captureStackTrace){
		let oForStack = {};
		throwErr = (sErr, fnCaller)=>{
			let sArgs = ' Arguments: [' + argsToString() + ']';
			Error.captureStackTrace(oForStack, fnCaller);
			throw new TypeError(sErr + sArgs, '\n', oForStack.stack);
		}
	}
	else{
		throwErr = (sErr)=>{
			let sArgs = ' Arguments: [' + argsToString() + ']';
			throw new TypeError(sErr + sArgs);
		}
	}

	// Complex custom types.
	// Seven complex types are defined here alrealy. You can defined your other
	// complex types you want by oCustomTypes, which is passed to
	// ArgumentsChecker constructor.
	this.complexTypes = Object.assign(oCustomTypes, {
		strArr(arg){
			if(!Array.isArray(arg) || arg.length===0){
				return false;
			}
			return arg.every(item=>typeof item === 'string');
		},
		numArr(arg){
			if(!Array.isArray(arg) || arg.length===0){
				return false;
			}
			return arg.every(item=>typeof item === 'number'
								&& !Number.isNaN(item));
		},
		intArr(arg){
			if(!Array.isArray(arg) || arg.length===0){
				return false;
			}
			return arg.every(item=>Number.isInteger(item));
		},
		int(arg){
			return Number.parseInt(arg) === arg;
		},
		decimalNumStr(arg){
			let num = Number.parseFloat(arg);
			if(num===0 && !Object.is(num, 0)){ // -0
				return  '-0' === arg;
			}
			return num + '' === arg;
		},
		decimalIntStr(arg){
			let num = Number.parseInt(arg, 10);
			if(num===0 && !Object.is(num, 0)){ // -0
				return  '-0' === arg;
			}
			return num + '' === arg;
		},
		nonEmptyOrBlankStr(arg){
			if(typeof arg !== 'string') return false;
			return arg.trim().length !== 0;
		}
	});


	// Methods in prototype
	if (typeof this.amount !== 'function')
	{
		// Get arguments object or rest parameters
		ArgumentsChecker.prototype.get = (args)=>{
			this.args = [...args];
			console.log(this);
			console.log('-------------');
			return this;
		};


		// Check arguments amount
		ArgumentsChecker.prototype.amount = (nExpected)=>{
			let nArgumentsLength = this.args.length;
			if(nArgumentsLength < nExpected){
				throwErr('ArgumentsChecker: Expects at least ' + nExpected + ' arguments, ' + nArgumentsLength + ' given.', ArgumentsChecker.prototype.amount);
			}
			return this;
		};


		// Check arguments type
		ArgumentsChecker.prototype.types = (aExpected)=>{
			aExpected.forEach((type, index)=>{
				if(type === null){
					return;
				}

				if(typeof type !== 'string'){
					throw new TypeError('Argument of ArgumentsChecker.types() '
										+ 'must be a type string or null');
				}
				type = type.trim();
				let sGivenType =  getTypeWithLowerCase(this.args[index]),
					sExpectedType = '';

// console.log(this.complexTypes);
				if(this.complexTypes.hasOwnProperty(type)){
					if( !this.complexTypes[type](this.args[index]) ){
						throwErr('ArgumentsChecker: argument ' + (index+1)
									+ ' expects ' + type + '.'
									, ArgumentsChecker.prototype.types);
					}
				}
				else if(type){
					type = type.trim().toLowerCase();

					// Number type does not include NaN
					if(Number.isNaN(this.args[index]) && type==='number'){
						throwErr('ArgumentsChecker: argument ' + (index+1)
									+ ' expects number, NaN given.'
									, ArgumentsChecker.prototype.types);
					}

					if(type !== sGivenType){
						if(type==='object'){
							sExpectedType = 'plain object';
						}
						else{
							sExpectedType = type;
						}
						if(sGivenType==='object'){sGivenType='plain object'};

						throwErr('ArgumentsChecker: argument ' + (index+1)
									+ ' expects ' + type + ', '
									+ sGivenType + ' given.'
									, ArgumentsChecker.prototype.types);
					}
				}
			});
			return this;
		}
	}
}

module.exports = ArgumentsChecker;
