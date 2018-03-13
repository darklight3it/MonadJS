import * as mocha from 'mocha';
import * as chai from 'chai';
import { setoid } from '../../src/monads/common';

class Implementoid<T> implements IMonad<T>, ISetoid<T> {
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }

  lift = () => this._value;
  of: IApplication<any>;
  ap: IApply<any>;
  map: IFunctor<any>;
  flatMap<U>(fn: (val: any) => IMonad<U>): IMonad<U> {
    throw new Error('Method not implemented.');
  }
  equals = setoid;
}

/**
### Setoid
1. `a.equals(a) === true` (reflexivity)
2. `a.equals(b) === b.equals(a)` (symmetry)
3. If `a.equals(b)` and `b.equals(c)`, then `a.equals(c)` (transitivity)
**/

describe('Setoid', () => {
  const arrValues = ['asd', 1, { value: '1' }, { value: () => {} }];

  it('Should folllow reflexivity property', () => {
    const arrayOfImplementors = createImplementors(...arrValues);
    const anotherArrayOfImplementors = createImplementors(...arrValues);

    arrayOfImplementors.map((impl, i) =>
      chai.assert.isTrue(impl.equals(anotherArrayOfImplementors[i]))
    );
  });

  it('Should follow simmetry property', () => {
    const arrayOfImplementors = createImplementors(...arrValues);
    const anotherArrayOfImplementors = createImplementors(...arrValues);

    arrayOfImplementors.map((impl, i) =>
      anotherArrayOfImplementors.map(anotherImpl =>
        chai.assert.isTrue(
          impl.equals(anotherImpl) === anotherImpl.equals(impl)
        )
      )
    );
  });

  it('Should follow transitivity property', () => {
    const arrayOfImplementors = createImplementors(...arrValues);
    const anotherArrayOfImplementors = createImplementors(...arrValues);
    const yetAnotherArrayOfImplementors = createImplementors(...arrValues);

    arrayOfImplementors.map((impl, i) => {
      chai.assert.isTrue(impl.equals(anotherArrayOfImplementors[i]));
      chai.assert.isTrue(
        anotherArrayOfImplementors[i].equals(yetAnotherArrayOfImplementors[i])
      );
      chai.assert.isTrue(impl.equals(yetAnotherArrayOfImplementors[i]));
    });
  });
});

const createImplementors = (...args: any[]) =>
  args.map(arg => new Implementoid(arg));
