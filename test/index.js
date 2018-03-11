'use strict';

const assert = require('assert');
const ArgumentsChecker = require('../src/ArgumentsChecker');

const oCustomChecker = {
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
    },
    arrayHas3Items(arg){
        return Array.isArray(arg) && arg.length===3;
    },
    arrayHas3NumberItems(arg){
        try{
            this.get([arg]).types(['arrayHas3Items']);
            arg.forEach(item=>{
                this.get([item]).types(['number']);
            });
        }
        catch(err){
            return false;
        }
        return true;
    },
};

const check = new ArgumentsChecker(oCustomChecker);


describe('ArgumentsChecker', ()=>{
    describe('Check arguments amount', ()=>{
        it('same as expected', ()=>{
            assert.doesNotThrow(
                ()=>{
                    ((...args)=>{
                        check.get(args).amount(4);
                    })(1, 2, 3, 4);
                }
            );
        });
        it('less than expected', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).amount(4);
                    })(1, 2, 3);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: Expects at least 4'
                    + ' arguments, 3 given.';
                }
            );
        });
        it('more than expected', ()=>{
            assert.doesNotThrow(
                ()=>{
                    ((...args)=>{
                        check.get(args).amount(4);
                    })(1, 2, 3, 4, 5);
                }
            );
        });
    });

    describe('Check basic types', ()=>{
        it('different from expected types', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['number', 'array', 'object']);
                    })(1, 2, 3);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 2 expects'
                    + ' array, number given.';
                }
            );
        });
        it('use null to allow any type', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['number', null, 'object']);
                    })(1, 2, 3);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 3 expects'
                    + ' object, number given.';
                }
            );
        });
        it('number type does not include NaN', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['number', 'number']);
                    })(2, NaN);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 2 expects'
                    + ' number, NaN given.';
                }
            );
        });
        it('expected type could be Null or Undefined', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['undefined', 'null', 'number']);
                    })(undefined, null, '3');
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 3 expects'
                    + ' number, string given.';
                }
            );
        });
    });

    describe('Check custom type', ()=>{
        describe('strArr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('strArr'));
                        })(['', '0'], ['2.13'], 2233);
                    }
                );
            });
            it('an empty array given', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('strArr'));
                        })([''], []);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects strArr.';
                    }
                );
            });
            it('an array contains other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('strArr'));
                        })(['', '3s'], ['3', 3]);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects strArr.';
                    }
                );
            });
        });
        describe('numArr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(8).fill('numArr'));
                        })([6, 0o7], [2.13, 0], [0b1, 0], [-0], [-0, 0xf]
                            , [0o7, 0b1], [0o7, -0], [Number.MAX_VALUE, 2.13]);
                    }
                );
            });
            it('an empty array given', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('numArr'));
                        })([555, 44], []);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects numArr.';
                    }
                );
            });
            it('an array contains NaN', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('numArr'));
                        })([66, 55], [44, NaN]);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects numArr.';
                    }
                );
            });
            it('an array contains other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('numArr'));
                        })([66, 55], [44, '33']);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects numArr.';
                    }
                );
            });
        });
        describe('intArr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(3).fill('intArr'));
                        })([6, 0o77], [0b11, -0], [0xaa, Number.MAX_VALUE]);
                    }
                );
            });
            it('an empty array given', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('intArr'));
                        })([55, 44], []);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects intArr.';
                    }
                );
            });
            it('an array contains other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('intArr'));
                        })([66, 55], [44, Math.PI]);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects intArr.';
                    }
                );
            });
        });
        describe('int', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(6).fill('int'));
                        })(0o7, 0b11, -0, 0xa, 0, 3);
                    }
                );
            });
            it('other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2).fill('int'));
                        })(44, Number.NEGATIVE_INFINITY);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects int.';
                    }
                );
            });
        });
        describe('decimalNumStr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(5)
                                                        .fill('decimalNumStr'));
                        })('123', '3.14', '-0', '0', '3');
                    }
                );
            });
            it('other radix', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                        .fill('decimalNumStr'));
                        })('44', '0x12');
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects decimalNumStr.';
                    }
                );
            });
            it('other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                        .fill('decimalNumStr'));
                        })('44', 22);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects decimalNumStr.';
                    }
                );
            });
        });
        describe('decimalIntStr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(3)
                                                        .fill('decimalIntStr'));
                        })('123', '-0', '0');
                    }
                );
            });
            it('float string', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                        .fill('decimalIntStr'));
                        })('44', '3.14');
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects decimalIntStr.';
                    }
                );
            });
            it('other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                        .fill('decimalIntStr'));
                        })('44', []);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects decimalIntStr.';
                    }
                );
            });
        });
        describe('nonEmptyOrBlankStr', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(3)
                                                .fill('nonEmptyOrBlankStr'));
                        })('0', 'null', '-0');
                    }
                );
            });
            it('empty string', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                .fill('nonEmptyOrBlankStr'));
                        })('0', '');
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects nonEmptyOrBlankStr.';
                    }
                );
            });
            it('blank string', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                .fill('nonEmptyOrBlankStr'));
                        })('0', ' ');
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects nonEmptyOrBlankStr.';
                    }
                );
            });
            it('other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                .fill('nonEmptyOrBlankStr'));
                        })('44', 44);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects nonEmptyOrBlankStr.';
                    }
                );
            });
        });
        describe('arrayHas3Items', ()=>{
            it('as expected', ()=>{
                assert.doesNotThrow(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                    .fill('arrayHas3Items'));
                        })([,,,], [undefined,undefined,undefined,], [1, 2, 3]);
                    }
                );
            });
            it('less than 3', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                    .fill('arrayHas3Items'));
                        })([4, 3, 2], [0, 3]);
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects arrayHas3Items.';
                    }
                );
            });
            it('other type', ()=>{
                assert.throws(
                    ()=>{
                        ((...args)=>{
                            check.get(args).types(Array(2)
                                                    .fill('arrayHas3Items'));
                        })([44, 33, 55], '123');
                    },
                    (err)=>{
                        return err.message === 'ArgumentsChecker: argument 2 '
                        + 'expects arrayHas3Items.';
                    }
                );
            });
        });
    });

    describe('Check nested checker', ()=>{
        it('as expected', ()=>{
            assert.doesNotThrow(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['string'
                                                    , 'arrayHas3NumberItems']);
                    })('666', [1, 2, 3]);
                },
            );
        });
        it('wrong type', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).types(['string'
                                                    , 'arrayHas3NumberItems']);
                    })('666', [1, 2, '3']);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 2 expects'
                    + ' arrayHas3NumberItems.';
                }
            );
        });
    });

    describe('Check amount and types', ()=>{
        it('as expected', ()=>{
            assert.doesNotThrow(
                ()=>{
                    ((...args)=>{
                        check.get(args).amount(3).types(['number', 'strArr']);
                    })(1, ['2'], '3');
                }
            );
        });
        it('wrong type', ()=>{
            assert.throws(
                ()=>{
                    ((...args)=>{
                        check.get(args).amount(4).types(['number', 'string']);
                    })(1, 2, 3, 4);
                },
                (err)=>{
                    return err.message === 'ArgumentsChecker: argument 2 expects'
                    + ' string, number given.';
                }
            );
        });
    });
});
