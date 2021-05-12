const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const products = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: false },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

console.log(sum((p) => p.quantity, products));

const total_quantity = sum((p) => p.quantity);

const total_price = sum((p) => p.price * p.quantity);

console.log(total_quantity(products));
console.log(total_price(products));
console.log(sum((user) => user.age, [{ age: 10 }, { age: 20 }, { age: 30 }]));

const body = document.querySelector("body");

body.innerHTML = `
  <table>
  <tr>
    <th>상품 이름</th>
    <th>가격</th>
    <th>수량</th>
    <th>총 가격</th>
  </tr>
  ${sum(
    (p) => `
        <tr>
          <td><input type='checkbox' ${p.is_selected ? "checked" : " "}></td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>${p.quantity}</td>
          <td>${p.price * p.quantity}</td>
        </tr>
        `,
    products
  )}
  
  <tr>
    <td colspan="2">합계</td>
    <td>${total_quantity(
      filter((product) => product.is_selected, products)
    )}</td>
    <td>${total_price(filter((product) => product.is_selected, products))}</td>
  </tr>

  </table>
`;
