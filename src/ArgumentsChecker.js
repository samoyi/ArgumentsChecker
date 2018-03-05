a = 22;
console.log(a);

function ArgumentsChecker(oCustomTypes={})
{

	// Get type string of checked with lower case
	const getTypeWithLowerCase = (checked)=>{
		return Object.prototype.toString.call(checked).slice(8, -1).toLowerCase();
	}


	// Stringify arguments array with a readable form
	const argsToString = ()=>{
		return this.args.map((arg)=>{
			if(typeof arg === 'object'){
				return getTypeWithLowerCase(arg);
			}
			else{
				switch(typeof arg){
					case 'string':     return '"' + arg + '"';
					case 'undefined':  return 'undefined';
					case 'null':       return 'null';
					default:           return arg;
				}
			}
		});
	}


	// Throw Error
	/*
	 * If ArgumentsChecker was instantiated with a argument of true, there will
	 * also be an alert popup which contains same information as thrown Error
	 */
	let throwErr = null;
	if(Error.captureStackTrace){
		let oForStack = {};
		throwErr = (sErr, fnCaller)=>{
			let sArgs = ' Arguments: [' + argsToString() + ']';
			Error.captureStackTrace(oForStack, fnCaller);
			console.error(sErr, '\n', oForStack.stack);
		}
	}
	else{
		throwErr = (sErr)=>{
			let sArgs = ' Arguments: [' + argsToString() + ']';
			throw new Error(sErr + sArgs);
		}
	}


	// aCustomTypeCheckFn.forEach(fn=>{
	// 	oCustomTypes[]
	// });
	oCustomTypes = Object.assign(oCustomTypes, {
		strArr(){
			if(!Array.isArray(arg)){
				return false;
			}
			return arg.every(item=>typeof item === 'string');
		},
		numArr(arg){
			if(!Array.isArray(arg)){
				return false;
			}
			return arg.every(item=>typeof item === 'number');
		},
		intArr(arg){
			if(!Array.isArray(arg)){
				return false;
			}
			return arg.every(item=>Number.isInteger(item));
		},
		int(arg){
			return Number.parseInt(arg) === arg;
		},
		intStr(arg){
			return Number.parseInt(arg) + '' === arg;
		},
		nonEmptyStr(arg){
			if(typeof arg !== 'string') return false;
			return arg.trim().length !== 0;
		}
	});

	// Methods in prototype
	if (typeof this.amount !== 'function')
	{
		// Get arguments object
		ArgumentsChecker.prototype.get = (oArguments)=>{
			this.args = [...oArguments];
			return this;
		};


		// Check arguments amount
		ArgumentsChecker.prototype.amount = (nExpected)=>{
			let nArgumentsLength = this.args.length;
			if(nArgumentsLength < nExpected){
				throwErr("ArgumentsChecker: Expects at least " + nExpected + " arguments, " + nArgumentsLength + " given.", ArgumentsChecker.prototype.amount);
			}
			return this;
		};


		// Check arguments type
		ArgumentsChecker.prototype.types = (aExpected)=>{
			aExpected.forEach((type, index)=>{
				type = type.trim();
				let sGivenType =  getTypeWithLowerCase(this.args[index]),
					sExpectedType = '';

				if(oCustomType.hasOwnProperty(type)){
					if( !oCustomType[type](sGivenType) ){
						throwErr("ArgumentsChecker: argument " +index
									+ " expects " + type
									, ArgumentsChecker.prototype.types);
					}
				}
				else if(type){
					type = type.trim().toLowerCase();
					if(type !== sGivenType){
						if(type==='object'){
							sExpectedType = 'plain object';
						}
						else{
							sExpectedType = type;
						}
						if(sGivenType==='object'){sGivenType='plain object'};

						throwErr("ArgumentsChecker: argument " +index
									+ " expects " + type + ", "
									+ sGivenType + " given."
									, ArgumentsChecker.prototype.types);
					}
				}
			});
			return this;
		}
	}
}

module.exports = ArgumentsChecker;
