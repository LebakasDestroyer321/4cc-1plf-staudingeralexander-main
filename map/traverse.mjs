import data from "./data.json" with { type: "json" };

console.log(data);

// myMap
// Es sollen, unter der Verwendung der ```myMap``` Funktion, alle Artikel mit deren aufsummierten Lagerständen ausgegeben werden.

// Alle ```articleId``` als Objekte der Artikel von oben, mit einer gesamten ```reservedAmount``` kleiner 30 (Unter der Verwendung der filter-Funktion).
function myMap(array, callback) {
    const result = [];
    for(let i = 0;i < array.length;i++)
        {
            result.push(callback(array[i],i, array));
        }
        return result;
}

const numbers = [1, 2, 3, 4];
const doubled = myMap(array, number => number * 2);
console.log(doubled); // Output: [2, 4, 6, 8]

console.log(data.myMap((acc,val)=>{
    val.yards.forEach(yard => {
        if(!acc[yard.yardId]) {
            acc[yard.yardId] = {yard: yard.yardId,sumAvailableAmount:0};
        }
        acc[yard.yardId].sumAvailableAmount += yard.availableAmount;
    });
    return acc;
},{}));

function sumAvailableAmount(data) {
    return data.myMap((acc,article) => {
        article.yards.forEach(yard => {
            acc[yard.yardId] = (acc[yard.yardId] || 0) + yard.availableAmount;
        });
        return acc;
    });
}
