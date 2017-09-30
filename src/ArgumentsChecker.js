function ArgumentsChecker( bAlert )
{
	"use strict";


	// Get type of checked with lower case
	const getTypeWithLowerCase = ( checked )=>{
		return Object.prototype.toString.call(checked).slice(8, -1).toLowerCase();
	}


	// Stringify arguments array with a readable form
	const argsToString = ()=>{
		return this.args.map((arg)=>{
			if( typeof arg === 'object' ){
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
	 *     also be a alert popup which contains same information as thrown Error
	 */
	const throwErr = ( sErr )=>{
		let sArgs = ' Arguments: [' + argsToString() + ']';
		if( bAlert ){ alert( sErr + sArgs ); }
		throw new Error( sErr + sArgs );
	}



	// Method in prototype
	if (typeof this.amount != 'function')
	{
		// Get arguments object
		ArgumentsChecker.prototype.get = (oArguments)=>{
			this.args = [...oArguments];
			return this;
		};


		// Check arguments amount
		ArgumentsChecker.prototype.amount = (nExpected)=>{
			let nArgumentsLength = this.args.length;
			if( nArgumentsLength < nExpected ){
				throwErr( "ArgumentsChecker: Expects at least " + nExpected + " arguments, " + nArgumentsLength + " given." );
			}
			return this;
		};


		// Check arguments type
		ArgumentsChecker.prototype.types = (aExpected)=>{
			aExpected.forEach((type, index)=>{
				if(type){
					let sGivenType =  getTypeWithLowerCase(this.args[index]);
					if( type.toLowerCase() !== sGivenType ){
						throwErr( "ArgumentsChecker: Expects " + type + ", " + sGivenType + " given." );
					}
				}
			});
			return this;
		}
	}
}
