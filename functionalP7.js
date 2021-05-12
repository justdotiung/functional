const add = (a, b) => a + b;
/**
 * ## range
 */
const range = (l) => {
  let res = [];
  let i = -1;
  while (++i < l) res.push(i);
  return res;
};

console.log(range(6));

/**
 * ## 느긋한 L.range
 */
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const list = L.range(4);

console.log(Infinity);
console.log(list.next());
console.log(list.next());

console.log(reduce(add, list));

/**
 * ## take
 */

function take(l, iter) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (l === a) break;
  }
  return res;
}
console.time("");
console.log(take(4, range(1000000)));
console.timeEnd("");
console.time("");
console.log(take(5, L.range(Infinity)));
console.timeEnd("");
