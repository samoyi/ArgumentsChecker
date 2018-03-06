'use strict';

const assert = require('assert');
const AC = require('../src/ArgumentsChecker');
const ac = new AC();

describe('Checker', function() {
    it('Check arguments amount', function() {
        assert.throws(()=>{
                ((...args)=>{
                    ac.get(args).amount(4);
                })(1, 2, 3);
            },
            (err)=>{
                return err.message === 'ArgumentsChecker: Expects at least 4 '
                                                        + 'arguments, 3 given.';
            },
        );
    });
});
