var test = require('tape');

test('sample test', (t) => {
  t.plan(2); //We'll be running two assertions in this test

  t.equal(typeof Date.now, 'function');
  t.notEqual('Pat', 'lame');
});
