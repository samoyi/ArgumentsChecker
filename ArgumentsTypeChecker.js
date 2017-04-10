"use strict";

/*
 * 支持链式调用。但如果调用链某个方法报错后就不会执行后面的方法
 *
 * TODO： 链式调用每个方法都需要输入函数名，麻烦
 *
 *
 */
	 
function ArgumentsTypeChecker()
{

	// get type of checked with lower case
	function getTypeWithLowerCase( checked )
	{
		var sType = Object.prototype.toString.call(checked).slice(8, -1);
		return sType.toLowerCase();
	}
	
	if (typeof this.argumengsAmountCheck != 'function') 
	{
		//if arguments amount is less than nExpectedAmount, throw an error
		ArgumentsTypeChecker.prototype.checkArgumengsAmount = function(sFunctionName, aArguments, nExpectedAmount)
		{	
			if( arguments.length < 3 )
			{
				throw new Error( "ArgumentsTypeChecker.checkArgumengsAmount needs 3 arguments" );
			}
			if( typeof sFunctionName !== "string" )
			{
				throw new TypeError(  "The first arguments of ArgumentsTypeChecker.checkArgumengsAmount should be function name string" );
			}
			if( (typeof aArguments === "object") && ((aArguments.valueOf())[0] === "[") )
			{
				throw new TypeError(  "The second arguments of ArgumentsTypeChecker.checkArgumengsAmount should be array of array-like object" );
			}
			if( typeof nExpectedAmount !== "number" )
			{
				throw new TypeError(  "The third arguments of ArgumentsTypeChecker.checkArgumengsAmount should be a number" );
			}
			
			var nArgumentsLength = aArguments.length;
			if( nArgumentsLength < nExpectedAmount )
			{	
				throw new Error( "The function " + sFunctionName + " expects " + nExpectedAmount + " arguments, " + nArgumentsLength + " given");
			}	
			return this;
		};
		
		// check if all of given arguments in aArguments if the type of sExpectedType, if not throw an error
		/*
		 * sExpectedType is case-insensitive
		 */
		ArgumentsTypeChecker.prototype.checkArgumentsType = function(sFunctionName, aArguments, sExpectedType)
		{	
			if( arguments.length < 3 )
			{

				throw new Error( "ArgumentsTypeChecker.checkArgumentsType needs 3 arguments" );
			}
			if( typeof sFunctionName !== "string" )
			{
				throw new TypeError(  "The first arguments of ArgumentsTypeChecker.checkArgumentsType should be function name string" );
			}
			if( (typeof aArguments === "object") && ((aArguments.valueOf())[0] === "[") )
			{
				throw new TypeError(  "The second arguments of ArgumentsTypeChecker.checkArgumentsType should be array of array-like object" );
			}
			if( typeof sExpectedType !== "string" )
			{
				throw new TypeError(  "The third arguments of ArgumentsTypeChecker.checkArgumentsType should be a string" );
			}
			
			sExpectedType = sExpectedType.toLocaleLowerCase();
			var sType = "";
			Array.prototype.forEach.call(aArguments, function(item, index)
			{
				sType = getTypeWithLowerCase( item );
				if( sType !== sExpectedType )
				{	
					throw new TypeError( "One of arguments in function " + sFunctionName + " has a wrong type, expected " + sExpectedType + ", " + sType + " given" );
				}
			});   
			return this;
		};
		
		// check if an argument is plain object
		/*
		 * if bCouldUndefined is given and equals true, undefined in checkedArgument will not trigger an error
		 */
		ArgumentsTypeChecker.prototype.confirmPlainObject = function (sFunctionName, checkedArgument, bCouldUndefined)
		{
			if( arguments.length < 2 )
			{
				throw new Error( "ArgumentsTypeChecker.confirmPlainObject needs 2 arguments at least" );
			}
			if( typeof sFunctionName !== "string" )
			{
				throw new TypeError(  "The first arguments of ArgumentsTypeChecker.confirmPlainObject should be function name string" );
			}
			
			var sTypeGiven = getTypeWithLowerCase( checkedArgument );
			if( (sTypeGiven !== "object" && sTypeGiven !== "undefined" ) || ( !bCouldUndefined && sTypeGiven === "undefined" ) )
			{
				throw new TypeError("One of arguments in function " + sFunctionName + " has a wrong type. Expected plain object, " + JSON.stringify(checkedArgument) + " given.");
			}
			return this;
		}
	}
}