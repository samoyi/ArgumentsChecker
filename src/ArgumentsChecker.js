;"use strict";

/*
 * 支持链式调用。但如果调用链某个方法报错后就不会执行后面的方法
 * 构造函数传参true或等值于true，则抛出错误是同时alert错误，便于在微信环境上查看错误
 */

function ArgumentsChecker( bAlert )
{

	// get type of checked with lower case
	function getTypeWithLowerCase( checked ){
		return Object.prototype.toString.call(checked).slice(8, -1).toLowerCase();
	}

	// Throw Error
	const throwErr = ( sErr )=>{
		// TODO 错误信息中的参数显示无法显示数字字符串的字符串形式
		let sArgs = ' Arguments: [' + [...this.args].toString() + ']';
		if( bAlert ){
			alert( sErr + sArgs );
		}
		throw new Error( sErr + sArgs );
	}

	if (typeof this.amount != 'function')
	{
		//
		ArgumentsChecker.prototype.get = (aArguments)=>{
			this.args = aArguments;
			return this;
		};

		// If arguments amount is less than nExpected, throw an error
		ArgumentsChecker.prototype.amount = (nExpected)=>{
			let nArgumentsLength = this.args.length;
			if( nArgumentsLength < nExpected ){
				throwErr( "ArgumentsChecker: Expects at least " + nExpected + " arguments, " + nArgumentsLength + " given." );
			}
			return this;
		};


		// Check arguments type
		ArgumentsChecker.prototype.type = (aExpected)=>{
			;"use strict";
			aExpected.forEach((type, index)=>{
				;"use strict";
				if(type){
					console.log(this); // TODO 如果不用箭头函数，这里为什么是 Window
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
