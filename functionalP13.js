const { log } = console;
const add = (a, b) => a + b;

/**
 * ## 지연된 함수열을 병렬적으로 평가하기 -C.reduce, C.take
 */

const noop = () => {};
const noopCatch = ([...arr]) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

const C = {};
C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, noopCatch(iter)) : reduce(f, noopCatch(acc))
);

C.take = curry((l, iter) => take(l, noopCatch(iter)));
C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

// var delay500 = (a) =>
//   new Promise((resolve) => {
//     console.log("hi");
//     setTimeout(() => resolve(a), 500);
//   });

// console.time("");
// go(
//   [1, 2, 3, 4, 5, 6, 7, 8],
//   L.map((a) => delay500(a * a)),
//   L.filter((a) => delay500(a % 2)),
//   L.map((a) => delay500(a * a)),
//   C.take(3),
//   C.reduce(add),
//   // log,
//   (_) => console.timeEnd("")
// );

// /**
//  * ## C.map C.filter
//  */
// C.map((a) => delay500(a * a), [1, 2, 3, 4]); //.then(log);
// filter((a) => delay500(a % 2), [1, 2, 3, 4]); //.then(log);

/**
 * ## 즉시, 지연, Promise, 병렬적 조합하기
 */
var delay500 = (a, name) =>
  new Promise((resolve) => {
    console.log(`${name} : ${a}`);
    setTimeout(() => resolve(a), 500);
  });

console.time("a");
go(
  L.range(9),
  L.map((a) => delay500(a + 1, "map1")),
  C.filter((a) => delay500(a % 2, "filter2")),
  L.map((a) => delay500(a * a, "map3")),
  // C.take(4),
  C.reduce(add),
  log,
  (_) => console.timeEnd("a")
);
