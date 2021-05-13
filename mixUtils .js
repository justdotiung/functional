const isIterable = (a) => a && a[Symbol.iterator];

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const L = {};

L.range = function* (l) {
  let i = -1;
  while (++i < l) yield i;
};

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield go1(a, f);
  }
});

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) yield a;
  }
});

L.entries = function* (obj) {
  for (const k of obj) yield [k, obj[k]];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) yield b;
    } else yield a;
  }
};

L.deepFlat = function* flat(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* flat(a);
    else yield a;
  }
};

L.flatMap = pipe(L.map, L.flatten);

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a.then((a) => {
          res.push(a);
          return l === res.length ? res : recur();
        });
      }
      res.push(a);
      if (l === res.length) break;
    }
    return res;
  })();
});

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

const takeAll = take(Infinity);

const join = (sep = ",", iter) => reduce((a, b) => `${a}${sep}${b}`, iter);

const find = curry(pipe(L.filter, take(1), ([a]) => a));

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const flatMap = pipe(L.map, L.flatten, takeAll);
