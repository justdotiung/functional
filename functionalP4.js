/**
 * # 제너레이터 / 이터레이터
 * - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수.
 * - 쉽게 well-formed iterable을 생성한다.
 * - return 은 마지막 done 이 true 가 되면서 반환
 * - suspended 상태가 되며 이터레이터 상태로 내부를 순회 해야 결과가 나온다.
 */
function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
  return 100;
}

const iter = gen();

console.log(iter === iter[Symbol.iterator]());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (const a of gen()) console.log(a);

/**
 * # odds
 */
console.log("odds");
function* infinity() {
  let i = -1;
  while (true) {
    yield ++i;
  }
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (l === a) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity())) {
    if (a % 2) yield a;
    if (a === l) return;
  }
}

for (const a of odds(5)) console.log(a);
// for (const a of limit(10, infinity())) console.log(a);
// const inf = infinity();
// console.log(inf.next());

/**
 * # for...of, 전개 연산자, 구조 분해, 나머지 연산자
 */

console.log([...odds(5)]);
console.log([...odds(5), odds(10)]);
const [head, ...tail] = [...odds(10)];
console.log(head);
console.log(tail);
