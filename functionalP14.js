const { log } = console;
const add = (a, b) => a + b;

var delay500 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));
// var delay500 = async (a) =>
//   await new Promise((resolve) => setTimeout(() => resolve(a), 100));

async function f1() {
  const a = [1, 2, 3, 4];
  const m = a.map((v) => delay500(v * 2));
  const lm = await C.map((v) => delay500(v * 2), a);
  console.log([...m]);
  // let b = [];
  let b = [];
  for (const a of m) {
    if (a instanceof Promise) await a.then((a) => b.push(a));
  }

  const ss = await delay500(10);
  console.log(ss);
  console.log(lm);
  console.log(b.reduce((a, b) => a + b));
}

f1();
