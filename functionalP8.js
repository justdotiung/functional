const { log } = console;

const L = {};

/**
 * # 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
 * - 제때 계산법 as
 * - 느긋한 계산법 as
 * - 제네레이터/이터레이터 프로토콜을 기반으로 구현
 */

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

/**
 * ### L.map
 */

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    console.log(a);
    yield f(a);
  }
});

const m = L.map((a) => a * 10, [1, 2, 3]);
// console.log([...m]);
console.log(m.next());
console.log(m.next());
/**
 * ### L.filter
 */

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const fi = L.filter((a) => a > 2, [1, 2, 3, 4]);
console.log(fi.next());
/**
 * ### map, filter 계열 함수들이 가지는 결합 법칙
 *
 * - 사용하는 데이터가 무엇이든지
 * - 사용하는 보조 함수가 순수 함수라면 무엇이든지
 * - 아래와 같이 결합한다면 둘 다 결과가 같다
 *
 * [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 * =
 * [[mapping, filtering, mapping], [mapping, filtering, mapping]]
 */

/**
 * ### reduce
 */

L.entries = function* (obj) {
  for (const a in obj) {
    yield [a, obj[a]];
  }
};

const join = curry((sep = ",", iter) => {
  return reduce((a, b) => `${a}${sep}${b}`, iter);
});

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  (a) => (console.log(a), a),
  join("&"),
  log
);

queryStr({ limit: 10, offset: 10, type: "notice" });

/**
 * ### take, find
 */
const users = [
  { age: 30 },
  { age: 31 },
  { age: 32 },
  { age: 33 },
  { age: 20 },
  { age: 21 },
  { age: 32 },
  { age: 33 },
  { age: 20 },
  { age: 21 },
];

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

log(find((user) => user.age < 30)(users));
