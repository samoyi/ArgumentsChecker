;"use strict";

/*
 * 支持链式调用。但如果调用链某个方法报错后就不会执行后面的方法
 * 构造函数传参true或等值于true，则抛出错误是同时alert错误，便于在微信环境上查看错误
 *
 * TODO： 链式调用每个方法都需要输入函数名，麻烦
 *
 *
 */

function ArgumentsChecker( bForWechat )
{

	const typeChecker = {
		isObject(arg){
			return typeof arg === 'object';
		},
		isPlainObjet(arg){
			return arg instanceof Object;
		},
		isArray(arg){
			return sArray(arg)
		},
		isIterator(arg){
			return typeof arg['Symbol.iterator'] === 'function';
		},
		isNumber(arg){
			return  arg && typeof arg === 'number';
		},
		isString(arg){
			return typeof arg === 'string';
		},
		isBoolean(arg){
			return typeof arg === 'boolean';
		},
		isDate(arg){
			return arg instanceof Date;
		}
	};


	// get type of checked with lower case
	function getTypeWithLowerCase( checked ){
		return Object.prototype.toString.call(checked).slice(8, -1).toLowerCase();
	}

	// Error
	function throwErr( sErr ){
		if( bForWechat ){
			alert( sErr );
		}
		throw new Error( sErr );
	}

	if (typeof this.argumengsAmountCheck != 'function')
	{
		// If arguments amount is less than nExpected, throw an error
		ArgumentsChecker.prototype.amount = function(aArguments, nExpected){
			let nArgumentsLength = aArguments.length;
			if( nArgumentsLength < nExpected ){
				throwErr( "ArgumentsChecker: Expects " + nExpected + " arguments, " + nArgumentsLength + " given" );
			}
			return this;
		};


		// check if all of given arguments in aArguments is the type of sExpectedType, if not throw an error
		/*
		 * sExpectedType is case-insensitive
		 */
		ArgumentsChecker.prototype.checkArgumentsType = function(sFunctionName, aArguments, sExpectedType)
		{

			sExpectedType = sExpectedType.toLocaleLowerCase();
			var sType = "";
			Array.prototype.forEach.call(aArguments, function(item, index)
			{
				sType = getTypeWithLowerCase( item );
				if( sType !== sExpectedType )
				{
					throwErr( "One of arguments in function " + sFunctionName + " has wrong type, expected " + sExpectedType + ", " + sType + " given" );
				}
			});
			return this;
		};

		// check if an argument is plain object
		/*
		 * if bCouldUndefined is given and equals true, undefined in checkedArgument will not trigger an error
		 */
		ArgumentsChecker.prototype.confirmPlainObject = function (sFunctionName, checkedArgument, bCouldUndefined)
		{
			if( arguments.length < 2 )
			{
				throwErr( "ArgumentsChecker.confirmPlainObject needs 2 arguments at least" );
			}
			if( typeof sFunctionName !== "string" )
			{
				throwErr( "The first arguments of ArgumentsChecker.confirmPlainObject should be function name string" );
			}

			var sTypeGiven = getTypeWithLowerCase( checkedArgument );
			if( (sTypeGiven !== "object" && sTypeGiven !== "undefined" ) || ( !bCouldUndefined && sTypeGiven === "undefined" ) )
			{
				throwErr( "One of arguments in function " + sFunctionName + " has a wrong type. Expected plain object, " + JSON.stringify(checkedArgument) + " given." );
			}
			return this;
		}
	}
}
