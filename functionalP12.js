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

go(
  [1, 2, 3, 4],
  L.map((n) => n + 10),
  take(2),
  console.log
);

go(
  [Promise.resolve(0), Promise.resolve(1), Promise.resolve(2)],
  L.map((n) => n + 1),
  take(2),
  console.log
);

go(
  L.range(4),
  map((a) => Promise.resolve(a + 1)),
  console.log
);

/**
 * Kleisli Composition - L.filter, filter, nop, take
 */

/**
 * reduce에서 nop 지원
 */
