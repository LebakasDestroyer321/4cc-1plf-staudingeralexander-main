'use strict';

function getAddX(x) {
    return function(y) {
        return x+y;
};
}

const add6 = getAddX(6); // Creates a new function with x = 6
const sum = add6(10); // Calls the new function with n = 10, resulting in
console.log(sum); // 16
