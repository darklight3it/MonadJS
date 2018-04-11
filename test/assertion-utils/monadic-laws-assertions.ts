import * as chai from 'chai';

const isTrue = chai.assert.isTrue;

// #region Monad
/* Monad
1. `M.of(a).chain(f)` is equivalent to `f(a)` (left identity)
2. `m.chain(M.of)` is equivalent to `m` (right identity)
3. `m.chain(f).chain(g)` is equivalent to `m.chain(x => f(x).chain(g))` (associativity)
*/

const assertMonadicLaws = <T,U,K>(M: IMonadStatic<T>, a:T, f:(val:T) => IMonad<U>, g:(val:U) => IMonad<K>) => { 
  const m = M.of(a);
  isTrue(m.flatMap(f).equals(f(a)), 'The Monad does not respect left identity, left value');
  isTrue(m.flatMap(M.of).equals(m), 'The Monad does not respect right identity');
  isTrue(m.flatMap(f).flatMap(g).equals(m.flatMap(x => f(x).flatMap(g))), 'The Monad does not associativity');
};


// #endregion


export default assertMonadicLaws;
