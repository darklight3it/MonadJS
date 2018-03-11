import * as chai from 'chai';

/** Three Monadic Laws
 *  Left identity: unit(x).chain(f) ==== f(x)
 *  Right identity: m.chain(unit) ==== m
 *  Associativity: m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
 */

const equal = chai.assert.equal;

const assertFirstLaw = (monadObj: IMonad<any>, fn:(val:any)=> any, gn: (val: any) => IMonad<any>) =>
  equal(
    fn(monadObj.value),
    monadObj.flatMap(gn).value,
    'The Monad does not respect left identity'
  );

const assertSecondLaw = (monadObj: IMonad<any>, fn: (val: any) => IMonad<any>) =>
  equal(
    monadObj.flatMap(fn).value,
    monadObj.value,
    'The Monad does not respect right identity'
);

const assertThirdLaw = (monadObj: IMonad<any>, fn: (val: any) => IMonad<any>, gn: (val:any) => IMonad<any>) =>
  equal(
    monadObj.flatMap(fn).flatMap(gn).value,
    monadObj.flatMap(val => fn(val).flatMap(gn)).value,
    'The Monad does not associativity'
);

const assertMonadicLaws = (monad: IMonadStatic) => { 
  const monadObj = monad.of(5);

  assertFirstLaw(monadObj, (val) => val + 2, (val)=> monad.of(val+2));
  assertSecondLaw(monadObj, monad.of);
  assertThirdLaw(monadObj, val => monad.of(val + 2), val => monad.of(val * 3));
}

export default assertMonadicLaws;
