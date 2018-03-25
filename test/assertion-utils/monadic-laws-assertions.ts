import * as chai from 'chai';

/** Three Monadic Laws
 *  Left identity: unit(x).chain(f) ==== f(x)
 *  Right identity: m.chain(unit) ==== m
 *  Associativity: m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
 */

const equal = chai.assert.equal;

const assertFirstLaw = <T>(monadObj: IMonad<T>, fn:(val:T)=> T, gn: (val: T) => IMonad<T>) =>
  equal(
    fn(monadObj.lift()),
    monadObj.flatMap(gn).lift(),
    'The Monad does not respect left identity'
  );

const assertSecondLaw = <T>(monadObj: IMonad<T>, fn: (val: T) => IMonad<T>) =>
  equal(
    monadObj.flatMap(fn).lift(),
    monadObj.lift(),
    'The Monad does not respect right identity'
);

const assertThirdLaw = <T>(monadObj: IMonad<T>, fn: (val: T) => IMonad<T>, gn: (val:T) => IMonad<T>) =>
  equal(
    monadObj.flatMap(fn).flatMap(gn).lift(),
    monadObj.flatMap(val => fn(val).flatMap(gn)).lift(),
    'The Monad does not associativity'
);


const assertMonadicLaws = <T>(monad: IMonad<T>, f: (val:T) => T, g: (val:T) => T) => {
  assertFirstLaw(monad, f, x => monad.of(f(x)));
  assertSecondLaw(monad, monad.of);
  assertThirdLaw(monad, x => monad.of(f(x)), x => monad.of(g(x)));
}

export default assertMonadicLaws;
