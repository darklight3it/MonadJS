import * as mocha from 'mocha';
import * as chai from 'chai';
import { setoid, functor, apply } from '../../src/monads/common';

/**
 * This Tests provides the general specification that a Monad shoul respect. This comes from category theory
 * 
 * 
 * 
 */


// #region Setoid
/**
### Setoid
1. `a.equals(a) === true` (reflexivity)
2. `a.equals(b) === b.equals(a)` (symmetry)
3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
**/

const arrValues = ['asd', 1, { value: '1' }, { value: () => {} }];

describe('Setoid', () => {
  it('Should respect reflexivity property', () => {
    const arrayOfImplementoids = createImplementoids(...arrValues);
    const anotherArrayOfImplementoids = createImplementoids(...arrValues);

    arrayOfImplementoids.map((impl, i) =>
      isTrue(impl.equals(anotherArrayOfImplementoids[i]))
    );
  });

  it('Should respect simmetry property', () => {
    const arrayOfImplementors = createImplementoids(...arrValues);
    const anotherArrayOfImplementors = createImplementoids(...arrValues);

    arrayOfImplementors.map((impl, i) =>
      anotherArrayOfImplementors.map(anotherImpl =>
        isTrue(impl.equals(anotherImpl) === anotherImpl.equals(impl))
      )
    );
  });

  it('Should respect transitivity property', () => {
    const arrayOfImplementors = createImplementoids(...arrValues);
    const anotherArrayOfImplementors = createImplementoids(...arrValues);
    const yetAnotherArrayOfImplementors = createImplementoids(...arrValues);

    arrayOfImplementors.map((impl, i) => {
      isTrue(impl.equals(anotherArrayOfImplementors[i]));
      isTrue(
        anotherArrayOfImplementors[i].equals(yetAnotherArrayOfImplementors[i])
      );
      isTrue(impl.equals(yetAnotherArrayOfImplementors[i]));
    });
  });
});

// #endregion

// #region Functor

/**
### Functor
1. `u.map(a => a)` is equivalent to `u` (identity)
2. `u.map(x => f(g(x)))` is equivalent to `u.map(g).map(f)` (composition)
**/

describe('Functor', () => {
  it('should respect identity property', () => {
    const implementoids = createImplementoids(...arrValues);

    implementoids.map(impl => isTrue(impl.map(x => x).equals(impl)));
  });

  it('should respect the composition property', () => {
    const implementoid = StaticImplementoid.of(1);
    const f = (value: any) => value + 5;
    const g = (value: any) => 0;

    isTrue(implementoid.map(x => f(g(x))).equals(implementoid.map(g).map(f)));
  });
});

// #endregion

// #region Applicative
/**
### Applicative
1. `v.ap(A.of(x => x))` is equivalent to `v` (identity)
2. `A.of(x).ap(A.of(f))` is equivalent to `A.of(f(x))` (homomorphism)
3. `A.of(y).ap(u)` is equivalent to `u.ap(A.of(f => f(y)))` (interchange)
**/

describe('Applicative', () => {
  it('Should respect identity property', () => {
    const implementoids = createImplementoids(...arrValues);
    const identity = (x: any) => x;

    implementoids.map(impl =>
      isTrue(impl.ap(StaticImplementoid.of(identity)).equals(impl))
    );
  });

  it('Should respect homomorphism', () => {
    const value = 1;
    const impl = StaticImplementoid.of(value);
    const f = (x: number) => x + 2;

    isTrue(
      impl.ap(StaticImplementoid.of(f)).equals(StaticImplementoid.of(f(1)))
    );
  });

  it('Should respect interchange', () => {
    const value = 1;
    const impl = StaticImplementoid.of(value);
    const g = (x: number) => x + 2;
    const u = StaticImplementoid.of(g);

    isTrue(impl.ap(u).equals(u.ap(StaticImplementoid.of((f: Function) => f(value)))));
  });
});

// #endregion

// #region Apply
/* 
### Apply
1. `v.ap(u.ap(a.map(f => g => x => f(g(x)))))` is equivalent to `v.ap(u).ap(a)` (composition)
*/

describe('Apply', () => {

  it('Should respect composition property', () => {
    
    const value = 1;
    const impl = StaticImplementoid.of(value);
    const f = (x: number) => x * 3;
    const g = (x: number) => x + 2;
    const u = StaticImplementoid.of(g);
    const v = StaticImplementoid.of(f)

    const curriedComposition = (f:(arg:number) => number) => (g:(arg:number)=>number) => (x:number) => f(g(x));

    isTrue(impl.ap(u.ap(v.map(curriedComposition))).equals(impl.ap(u).ap(v)));
    
  });
});

// #endregion

// #region TestClass Implementoid
class Implementoid<T> implements IMonad<T>, ISetoid<T> {
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }
  lift = () => this._value;
  of = application;
  ap = apply;
  map = functor;
  flatMap<U>(fn: (val: any) => IMonad<U>): IMonad<U> {
    throw new Error('Method not implemented.');
  }
  equals = setoid;
}

const StaticImplementoid = (function(): IMonadStatic {
  let staticImplentoid = <IMonadStatic>function(value: any) {};

  staticImplentoid.of = (value: any) => new Implementoid(value);

  return staticImplentoid;
})();

// #endregion

// #region Private Members

const application: IApplication<any> = (value: any) => new Implementoid(value);

const createImplementoids = (...args: any[]) =>
  args.map(arg => StaticImplementoid.of(arg));

const isTrue = chai.assert.isTrue;
// #endregion
