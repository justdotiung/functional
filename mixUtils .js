const isIterable = (a) => a && a[Symbol.iterator];

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

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

const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    const b = go1(a, f);

    if (b instanceof Promise) {
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    } else if (b) yield a;
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
        return a
          .then((a) => {
            res.push(a);
            return l === res.length ? res : recur();
          })
          .catch((e) => (e === nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (l === res.length) break;
    }
    return res;
  })();
});

const reduceP = (f, acc, a) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e))
      )
    : f(acc, a);

const head = (iter) => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceP(f, acc, cur.value);
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
