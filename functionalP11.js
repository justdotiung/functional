/**
 * 비동기 동시성 프로그래밍
 */

/**
 * # Promise
 */

/**
 * ## 일급
 */

const add10 = (a, f) => {
  setTimeout(() => {
    f(a + 10);
  }, 100);
};

// var a = add10(5, (res) =>
//   add10(res, (res) => add10(res, (res) => console.log(res)))
// );

const add20 = (a) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(a + 20);
    }, 100)
  );
};

// var b = add20(5).then(add20).then(add20).then(console.log);
// console.log(a); undefined
// console.log(b); promise

/**
 * ## 일급 활용
 */
const delay100 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const add5 = (a) => a + 5;

var n1 = 4;
// go1(go1(n1, add5), console.log);

var n2 = delay100(4);
go1(go1(n2, add5), console.log);

/**
 * ## Composition
 */
var f = (n) => n + 1;
var f2 = (n) => n * n;

// Array.of(1)
//   .map(f)
//   .map(f2)
//   .forEach((n) => console.log(n));
// // 평가되지않음.
// []
//   .map(f)
//   .map(f2)
//   .forEach((n) => console.log(n));

// new Promise((resolve) => setTimeout(() => resolve(1), 100))
//   .then(f)
//   .then(f2)
//   .then(console.log);

/**
 * ## Kleisli Composition
 */
var users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

const getUSerById = (id) =>
  find((u) => u.id === id, users) || Promise.reject("없어요!");
var f = ({ name }) => name;
var g = getUSerById;

var fg = (id) => f(g(id));

console.log(fg(1));

users.pop();
users.pop();
// console.log(fg(2));

new Promise((resolve) => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f)
  .then(console.log)
  .catch(console.log);
