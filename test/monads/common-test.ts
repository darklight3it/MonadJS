import * as mocha from 'mocha';
import * as chai from 'chai';
import { setoid, functor, apply, chain } from '../../src/monads/common';
import { Identity } from '../../src/monads/identity';
import { Maybe } from '../../src/monads/maybe';

//const it = require('mocha-param');

/*
 * This Tests provides the general specification that a Monad shoul respect. My frame of reference was the outstanding specification
 * fantasy-land, which provides a complete description of all the structures in Category Theory. You can find the specification here:
 * 
 * - https://github.com/fantasyland/fantasy-land
 */

const arrValues = ['asd', 1, { value: '1' }, { value: () => {} }];

[Identity, Maybe].forEach((staticMonad: IMonadStatic<any>) => {
  var name = staticMonad.constructor.name.replace('Static', '');

  describe(name + ' General Tests', () => {
  // #region Setoid
  /*
  ### Setoid
  1. `a.equals(a) === true` (reflexivity)
  2. `a.equals(b) === b.equals(a)` (symmetry)
  3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
  **/
  describe('Setoid', () => {
    it('Should respect reflexivity property', () => {
      const arrayOfImplementoids = createMonads(staticMonad, ...arrValues);
      const anotherArrayOfImplementoids = createMonads(
        staticMonad,
        ...arrValues
      );

      arrayOfImplementoids.map((impl, i) =>
        isTrue(impl.equals(anotherArrayOfImplementoids[i]))
      );
    });

    it('Should respect simmetry property', () => {
      const arrayOfImplementors = createMonads(staticMonad, ...arrValues);
      const anotherArrayOfImplementors = createMonads(
        staticMonad,
        ...arrValues
      );

      arrayOfImplementors.map((impl, i) =>
        anotherArrayOfImplementors.map(anotherImpl =>
          isTrue(impl.equals(anotherImpl) === anotherImpl.equals(impl))
        )
      );
    });

    it('Should respect transitivity property', () => {
      const arrayOfImplementors = createMonads(staticMonad, ...arrValues);
      const anotherArrayOfImplementors = createMonads(
        staticMonad,
        ...arrValues
      );
      const yetAnotherArrayOfImplementors = createMonads(
        staticMonad,
        ...arrValues
      );

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
      const implementoids = createMonads(staticMonad, ...arrValues);

      implementoids.map(impl => isTrue(impl.map((x: any) => x).equals(impl)));
    });

    it('should respect the composition property', () => {
      const implementoid = staticMonad.of(1);
      const f = (value: any) => value + 5;
      const g = (value: any) => 0;

      isTrue(
        implementoid.map((x: any) => f(g(x))).equals(implementoid.map(g).map(f))
      );
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
    console.log(name);
    it('Should respect identity property', () => {
      const implementoids = createMonads(staticMonad, ...arrValues);
      const identity = (x: any) => x;

      implementoids.map(impl =>
        isTrue(impl.ap(staticMonad.of(identity)).equals(impl))
      );
    });

    it('Should respect homomorphism', () => {
      const value = 1;
      const impl = staticMonad.of(value);
      const f = (x: number) => x + 2;

      isTrue(impl.ap(staticMonad.of(f)).equals(staticMonad.of(f(1))));
    });

    it('Should respect interchange', () => {
      const value = 1;
      const impl = staticMonad.of(value);
      const g = (x: number) => x + 2;
      const u = staticMonad.of(g);

      isTrue(
        impl.ap(u).equals(u.ap(staticMonad.of((f: Function) => f(value))))
      );
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
      const impl = staticMonad.of(value);
      const f = (x: number) => x * 3;
      const g = (x: number) => x + 2;
      const u = staticMonad.of(g);
      const v = staticMonad.of(f);

      const curriedComposition = (f: (arg: number) => number) => (
        g: (arg: number) => number
      ) => (x: number) => f(g(x));

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
      const impl = staticMonad.of(value);
      const f = (x: number) => staticMonad.of(x * 3);
      const g = (x: number) => staticMonad.of(x + 2);

      isTrue(
        impl
          .flatMap(f)
          .flatMap(g)
          .equals(impl.flatMap((x: any) => f(x).flatMap(g)))
      );
    });
  });
  // #endregion
})});



// #region Private Members

const createMonads = (staticMonad: IMonadStatic<any>, ...args: any[]) =>
  args.map(arg => staticMonad.of(arg));

const isTrue = chai.assert.isTrue;
// #endregion
