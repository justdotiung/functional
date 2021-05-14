/**
 * ## go, pipe, reduce에서 비동기 제어
 */
// go(
//   Promise.resolve(1),
//   (a) => a + 10,
//   (a) => Promise.reject("error"),
//   (a) => a + 1000,
//   console.log
// ).catch(console.log);

/**
 * ### 지연 평가 + Promise - L.map, map, take
 */

// go(
//   [1, 2, 3, 4],
//   L.map((n) => n + 10),
//   take(2)
//   // console.log
// );

// go(
//   [Promise.resolve(0), Promise.resolve(1), Promise.resolve(2)],
//   L.map((n) => n + 1),
//   take(2)
//   // console.log
// );

// go(
//   L.range(4),
//   map((a) => Promise.resolve(a + 1))
//   // console.log
// );

// /**
//  * Kleisli Composition - L.filter, filter, nop, take
//  */
// go(
//   // L.range(4),
//   [
//     Promise.resolve(0),
//     Promise.resolve(1),
//     Promise.resolve(2),
//     Promise.resolve(3),
//   ],
//   L.filter((a) => Promise.resolve(a % 2)),
//   L.map((a) => {
//     // console.log(a);
//     return a;
//   }),
//   take(4)
//   // filter((a) => a % 2),
//   // console.log
// );

/**
 * reduce에서 nop 지원
 */
const add = (a, b) => a + b;
go(
  [1, 2, 3],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
  console.log
);

go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map((a) => {
    console.log(a);
    return new Promise((resolve) => setTimeout(() => resolve(a * a), 1000));
  }),
  L.filter((a) => {
    console.log(a);
    return Promise.resolve(a % 2);
  }),
  // takeAll,
  take(5),
  // reduce(add),
  console.log
);

// const ps = [
//   new Promise((res) => setTimeout(() => res(1), 1000)),
//   new Promise((res) => setTimeout(() => res(2), 2000)),
// ];
// ps[0].then(console.log);
// ps[1].then(console.log);

// Promise.all(ps).then(console.log);

// (async function () {
//   const p0 = await ps[0];
//   const p1 = await ps[1];
//   console.log(p0, 123);
//   console.log(p1, 123);
// })();
