import * as mocha from 'mocha';
import * as chai from 'chai';
import { setoid, functor, apply, chain } from '../../src/monads/common';

/*
 * This Tests provides the general specification that a Monad shoul respect. My frame of reference was the outstanding specification
 * fantas-land, which provides a complete description of all the structures in Category Theory. You can find the specification here:
 * 
 * - https://github.com/fantasyland/fantasy-land
 */

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
  flatMap = chain;
  equals = setoid;
}


class StaticImplementoid implements IMonadStatic<any> {
  of = (value: any) => new Implementoid(value);
}

// #endregion

// #region Setoid
/*
### Setoid
1. `a.equals(a) === true` (reflexivity)
2. `a.equals(b) === b.equals(a)` (symmetry)
3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
**/

const arrValues = ['asd', 1, { value: '1' }, { value: () => {} }];
const staticImplementoid = new StaticImplementoid();

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

/*
### Functor
1. `u.map(a => a)` is equivalent to `u` (identity)
2. `u.map(x => f(g(x)))` is equivalent to `u.map(g).map(f)` (composition)
**/

describe('Functor', () => {
  it('should respect identity property', () => {
    const implementoids = createImplementoids(...arrValues);

    implementoids.map(impl => isTrue(impl.map((x:any) => x).equals(impl)));
  });

  it('should respect the composition property', () => {
    const implementoid = staticImplementoid.of(1);
    const f = (value: any) => value + 5;
    const g = (value: any) => 0;

    isTrue(implementoid.map((x:any) => f(g(x))).equals(implementoid.map(g).map(f)));
  });
});

// #endregion

// #region Applicative
/*
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
      isTrue(impl.ap(staticImplementoid.of(identity)).equals(impl))
    );
  });

  it('Should respect homomorphism', () => {
    const value = 1;
    const impl = staticImplementoid.of(value);
    const f = (x: number) => x + 2;

    isTrue(impl
        .ap(staticImplementoid.of(f))
        .equals(staticImplementoid.of(f(1))));
  });

  it('Should respect interchange', () => {
    const value = 1;
    const impl = staticImplementoid.of(value);
    const g = (x: number) => x + 2;
    const u = staticImplementoid.of(g);

    isTrue(impl
        .ap(u)
        .equals(u.ap(staticImplementoid.of((f: Function) => f(value)))));
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
    const impl = staticImplementoid.of(value);
    const f = (x: number) => x * 3;
    const g = (x: number) => x + 2;
    const u = staticImplementoid.of(g);
    const v = staticImplementoid.of(f);

    const curriedComposition = (f:(arg:number) => number) => (g:(arg:number)=>number) => (x:number) => f(g(x));

    isTrue(impl.ap(u.ap(v.map(curriedComposition))).equals(impl.ap(u).ap(v)));
    
  });
});

// #endregion

// #region Chain
/*
### Chain
1. `m.chain(f).chain(g)` is equivalent to `m.chain(x => f(x).chain(g))` (associativity)
*/

describe('Chain', () => {

  it('Should respect associativity property', () => {
    const value = 1;
    const impl = staticImplementoid.of(value);
    const f = (x: number) => staticImplementoid.of(x * 3);
    const g = (x: number) => staticImplementoid.of(x + 2);

    isTrue(impl.flatMap(f).flatMap(g).equals(impl.flatMap((x:any) => f(x).flatMap(g))))
    
  });
});

// #endregion

// #region Private Members

const application: IApplication<any> = (value: any) => new Implementoid(value);

const createImplementoids = (...args: any[]) =>
  args.map(arg => staticImplementoid.of(arg));

const isTrue = chai.assert.isTrue;
// #endregion
