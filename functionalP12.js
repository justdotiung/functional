/**
 * ## go, pipe, reduce에서 비동기 제어
 */

// Promise.resolve(1).then(console.log);
// console.log(2);

go(
  1,
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  // (a) => a + 100,
  (a) => a + 1000,
  console.log
); //.then(console.log);
