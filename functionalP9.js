// 수평적 평가
go(
  range(10),
  map((a) => a * 2),
  filter((a) => a < 12),
  take(4),
  console.log
);

// 수직적 평가
go(
  L.range(10),
  L.map((a) => a * 2),
  L.filter((a) => a < 12),
  take(4),
  console.log
);
