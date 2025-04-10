
const lista_ = [1, 10, 12, 30, 10, 23];

let maiorNumero_ = -Infinity;
let segundoMaior_ = -Infinity;

for (let num of lista_) {

    if (num > maiorNumero_) {

        segundoMaior_ = maiorNumero_
        maiorNumero_ = num;

    } else if (num > segundoMaior_ && maiorNumero_ !== num) {
        segundoMaior_ = num;
    }

}

console.log(maiorNumero_);
console.log(segundoMaior_);