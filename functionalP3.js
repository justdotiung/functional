/**
 * ## 기존과 달라진 ES6에서의 리스트 순회
 * - for i++
 * - for of
 */
{
  //ES5
  const list = [1, 2, 3];
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
  }

  const str = "abc";
  for (var i = 0; i < list.length; i++) {
    console.log(str[i]);
  }

  //ES6
  for (const i of list) {
    console.log(i);
  }
  for (const i of str) {
    console.log(i);
  }
}
/**
 * ### Array를 통해 알아보기
 */
{
  console.log("Array");
  const arr = [1, 2, 3];
  for (const a of arr) console.log(a);
}
/**
 * ### Set을 통해 알아보기
 */
{
  console.log("Set");
  const set = new Set([1, 2, 3]);
  for (const a of set) console.log(a);
}
/**
 * ### Map을 통해 알아보기
 */
{
  console.log("Map");
  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  for (const a of map) console.log(a);
}
/**
 * ## 이터러블 / 이터레이터 프로토콜
 * - 이터러블: 이터레이터를 리턴하는 [Symbol.iteratior]() 를 가진 값.
 * - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
 * - 이터러블 / 이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 * - 이터레이터이면서 이터러블 이라면 (well-formed iterable) 이다.
 */

/**
 * ### 사용자 정의 이터러블을 통해 알아보기
 */
{
  const iterable = {
    [Symbol.iterator]: function () {
      let i = 3;
      return {
        next: function () {
          return i === 0 ? { done: true } : { value: --i, done: false };
        },
        [Symbol.iterator]: function () {
          return this;
        },
      };
    },
  };
  const iter = iterable[Symbol.iterator]();
  iter.next();
  //well-formed iterable 라면 어느 시점에서든  값을 평가 할 수 있다.
  for (const a of iter) console.log(a);

  const all = document.querySelectorAll("*");

  const node = all[Symbol.iterator]();

  console.log(node[Symbol.iterator]() === node);
}
/**
 * ### 전개연산자
 */
{
  const a = [1, 2];
  a[Symbol.iterator] = null;
  console.log([...a, ...[1, 2]]);
}
