/**
 * 지연성 / 이터러블 중심 프로그래밍 실무적인 코드
 */

var users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 51 },
      { name: "a2", age: 41 },
      { name: "a3", age: 11 },
      { name: "a4", age: 16 },
    ],
  },
  {
    name: "b",
    age: 25,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 62 },
      { name: "c2", age: 64 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

go(
  users,
  L.map((u) => u.family),
  L.flatten,
  L.filter((u) => u.age < 20),
  L.map((a) => a.age),
  take(2),
  console.log
);
go(
  users,
  L.map((u) => u.family),
  L.flatten,
  L.filter((u) => u.age < 20),
  takeAll,
  console.log
);
