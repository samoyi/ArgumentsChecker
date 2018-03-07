'use strict';

const assert = require('assert');
const ArgumentsChecker = require('../src/ArgumentsChecker');
const check = new ArgumentsChecker({
    positiveNumber(arg){
        return typeof arg === 'number' && arg>0;
    },
    arrayHas3Items(arg){
        return Array.isArray(arg) && arg.length===3;
    }
});




const check1 = new ArgumentsChecker();
((...args)=>{
    check1.get(args).types(['positiveNumber']);
})(12);

const check2 = new ArgumentsChecker();
((...args)=>{
    check1.get(args).types(['positiveNumber']);
})(22);


//
// describe('ArgumentsChecker', ()=>{
//     describe('Check arguments amount', ()=>{
//         it('Less than expected', ()=>{
//             assert.throws(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).amount(4);
//                     })(1, 2, 3);
//                 },
//                 (err)=>{
//                     return err.message === 'ArgumentsChecker: Expects at least 4'
//                     + ' arguments, 3 given.';
//                 }
//             );
//         });
//         it('More than expected', ()=>{
//             assert.doesNotThrow(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).amount(4);
//                     })(1, 2, 3, 4, 5);
//                 }
//             );
//         });
//         it('Same as expected', ()=>{
//             assert.doesNotThrow(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).amount(4);
//                     })(1, 2, 3, 4);
//                 }
//             );
//         });
//     });
//     describe('Check basic types', ()=>{
//         it('Different from expected types', ()=>{
//             assert.throws(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).types(['number', 'array', 'object']);
//                     })(1, 2, 3);
//                 },
//                 (err)=>{
//                     return err.message === 'ArgumentsChecker: argument 2 expects'
//                     + ' array, number given.';
//                 }
//             );
//         });
//         it('Use null to allow any type', ()=>{
//             assert.throws(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).types(['number', null, 'object']);
//                     })(1, 2, 3);
//                 },
//                 (err)=>{
//                     return err.message === 'ArgumentsChecker: argument 3 expects'
//                     + ' object, number given.';
//                 }
//             );
//         });
//         it('Number type does not include NaN', ()=>{
//             assert.throws(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).types(['number', 'number']);
//                     })(2, NaN);
//                 },
//                 (err)=>{
//                     return err.message === 'ArgumentsChecker: argument 2 expects'
//                     + ' number, NaN given.';
//                 }
//             );
//         });
//         it('Expected type could be Null or Undefined', ()=>{
//             assert.throws(
//                 ()=>{
//                     ((...args)=>{
//                         check.get(args).types(['undefined', 'null', 'number']);
//                         // checker.get(args).amount(5).types(['number', null, 'array', 'object']);
//                     })(undefined, null, '3');
//                 },
//                 (err)=>{
//                     return err.message === 'ArgumentsChecker: argument 3 expects'
//                     + ' number, string given.';
//                 }
//             );
//         });
//     });
//     describe('Check complex types', ()=>{
//         describe('strArr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('strArr'));
//                         })(['', '0'], ['2.13'], 2233);
//                     }
//                 );
//             });
//             it('an empty array given', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('strArr'));
//                         })([''], []);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects strArr.';
//                     }
//                 );
//             });
//             it('an array contains other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('strArr'));
//                         })(['', '3s'], ['3', 3]);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects strArr.';
//                     }
//                 );
//             });
//         });
//         describe('numArr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(8).fill('numArr'));
//                         })([6, 0o7], [2.13, 0], [0b1, 0], [-0], [-0, 0xf]
//                             , [0o7, 0b1], [0o7, -0], [Number.MAX_VALUE, 2.13]);
//                     }
//                 );
//             });
//             it('an empty array given', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('numArr'));
//                         })([555, 44], []);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects numArr.';
//                     }
//                 );
//             });
//             it('an array contains NaN', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('numArr'));
//                         })([66, 55], [44, NaN]);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects numArr.';
//                     }
//                 );
//             });
//             it('an array contains other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('numArr'));
//                         })([66, 55], [44, '33']);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects numArr.';
//                     }
//                 );
//             });
//         });
//         describe('intArr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(3).fill('intArr'));
//                         })([6, 0o77], [0b11, -0], [0xaa, Number.MAX_VALUE]);
//                     }
//                 );
//             });
//             it('an empty array given', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('intArr'));
//                         })([55, 44], []);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects intArr.';
//                     }
//                 );
//             });
//             it('an array contains other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('intArr'));
//                         })([66, 55], [44, Math.PI]);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects intArr.';
//                     }
//                 );
//             });
//         });
//         describe('int', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(6).fill('int'));
//                         })(0o7, 0b11, -0, 0xa, 0, 3);
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2).fill('int'));
//                         })(44, Number.NEGATIVE_INFINITY);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects int.';
//                     }
//                 );
//             });
//         });
//         describe('decimalNumStr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(5)
//                                                         .fill('decimalNumStr'));
//                         })('123', '3.14', '-0', '0', '3');
//                     }
//                 );
//             });
//             it('other radix', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                         .fill('decimalNumStr'));
//                         })('44', '0x12');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects decimalNumStr.';
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                         .fill('decimalNumStr'));
//                         })('44', 22);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects decimalNumStr.';
//                     }
//                 );
//             });
//         });
//         describe('decimalIntStr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(3)
//                                                         .fill('decimalIntStr'));
//                         })('123', '-0', '0');
//                     }
//                 );
//             });
//             it('float string', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                         .fill('decimalIntStr'));
//                         })('44', '3.14');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects decimalIntStr.';
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                         .fill('decimalIntStr'));
//                         })('44', []);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects decimalIntStr.';
//                     }
//                 );
//             });
//         });
//         describe('nonEmptyOrBlankStr', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(3)
//                                                 .fill('nonEmptyOrBlankStr'));
//                         })('0', 'null', '-0');
//                     }
//                 );
//             });
//             it('empty string', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                 .fill('nonEmptyOrBlankStr'));
//                         })('0', '');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects nonEmptyOrBlankStr.';
//                     }
//                 );
//             });
//             it('blank string', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                 .fill('nonEmptyOrBlankStr'));
//                         })('0', ' ');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects nonEmptyOrBlankStr.';
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                 .fill('nonEmptyOrBlankStr'));
//                         })('44', 44);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects nonEmptyOrBlankStr.';
//                     }
//                 );
//             });
//         });
//     });
//     describe('Check custom type', ()=>{
//         describe('positiveNumber', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('positiveNumber'));
//                         })(0.1, Number.POSITIVE_INFINITY);
//                     }
//                 );
//             });
//             it('zero', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('positiveNumber'));
//                         })(4, 0);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects positiveNumber.';
//                     }
//                 );
//             });
//             it('negative number', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('positiveNumber'));
//                         })(4, -1);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects positiveNumber.';
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('positiveNumber'));
//                         })(44, '44');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects positiveNumber.';
//                     }
//                 );
//             });
//         });
//         describe('arrayHas3Items', ()=>{
//             it('as expected', ()=>{
//                 assert.doesNotThrow(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('arrayHas3Items'));
//                         })([,,,], [undefined,undefined,undefined,], [1, 2, 3]);
//                     }
//                 );
//             });
//             it('less than 3', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('arrayHas3Items'));
//                         })([4, 3, 2], [0, 3]);
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects arrayHas3Items.';
//                     }
//                 );
//             });
//             it('other type', ()=>{
//                 assert.throws(
//                     ()=>{
//                         ((...args)=>{
//                             check.get(args).types(Array(2)
//                                                     .fill('arrayHas3Items'));
//                         })([44, 33, 55], '123');
//                     },
//                     (err)=>{
//                         return err.message === 'ArgumentsChecker: argument 2 '
//                         + 'expects arrayHas3Items.';
//                     }
//                 );
//             });
//         });
//     });
// });
