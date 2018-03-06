'use strict';

const assert = require('assert');
const AC = require('../src/ArgumentsChecker');
const ac = new AC();

describe('', function() {
    it('should return -1 when the value is not present', function() {
        assert.throws((a,b,c)=>{
            function foo(){
                ac.get(arguments).amount(4);
            }
            foo(1, 2, 3);
        });

        // assert.equal([1,2,3].indexOf(4), -1);
    });
});
