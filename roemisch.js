'use strict';

function getRoemisch(number) {
    const romanNumer = [
        { value:50, symbol: 'L'},
        { value:40, symbol: 'XL'},
        { value:10, symbol: 'X'},
        { value:9, symbol: 'IX'},
        { value:5, symbol: 'V'},
        { value:4, symbol: 'IV'},
        { value:1, symbol: 'I'},
    ];
    let result = '';
    for(const numeral of romanNumer) {
        while(number >= numeral.value){
            result += numeral.symbol;
            number -= numeral.value;
        }
    }
    return result;
}

// Example usage:
console.log(getRoemisch(29)); // XXIX
console.log(getRoemisch(44)); // XLIV
console.log(getRoemisch(50)); // L
