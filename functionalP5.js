const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// for (const a of products) console.log(a);

/**
 * # map
 */
function map(f, iter) {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

console.log(map((p) => p.name, products));

/**
 * # 이터러블 프로토콜을 따른 map의 다형성
 */
const els = document.querySelectorAll("*");
// els.map(el => el.nodeName); //error
console.log(map((el) => el.nodeName, els));

const m = new Map();
m.set("a", 1);
m.set("b", 2);

const it = m[Symbol.iterator]();
console.log(new Map(map(([k, v]) => [k, v * 2], it)));

/**
 * # filter
 */
function filter(f, iter) {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
}

console.log(...filter((p) => p.price < 20000, products));

/**
 * #reduce
 */

function reduce(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

console.log(reduce((a, c) => a + c, 0, [1, 2, 3, 4, 5]));
console.log(reduce((a, c) => a + c, [1, 2, 3, 4, 5]));
console.log(
  reduce((total_price, product) => total_price + product.price, 0, products)
);
