import * as mocha from 'mocha';
import * as chai from 'chai';
import { Maybe, Some, None } from '../../src/monads/maybe';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';

// #region Maybe
describe('Maybe Monad', () => {
  const f = (x: number) => Maybe.of(x + 2);
  const g = (x: number) => Maybe.of(x * 3);

  it('should follow the Monadic Laws for Some', () => {
    assertMonadicLaws(Maybe, 3, f, g); // Assert for Some values
  });
  
  it('should follow the Monadic Laws for null', () => {
    assertMonadicLaws(Maybe, null, f, g); // Assert for Some values
  });

  it('should follow the Monadic Laws for undefined', () => {
    assertMonadicLaws(Maybe, undefined, f, g); // Assert for Some values
  });
});
// #endregion

// #region Some

describe('Some Monad', () => {
  it('isSome and isNone should work correctly', () => {
    const some = new Some(3);

    chai.assert.isTrue(some.isSome());
    chai.assert.isFalse(some.isNone());
  });

  it('should correctly create a Some Monad from a non null value', () => {
    const some = new Some(3);
    chai.assert.equal(some.lift(), 3);
  });

  it("should throw if it's created from null or undefined", () => {
    chai.assert.throws(
      () => new Some(null),
      'A Some monad cannot be created from null'
    );
    chai.assert.throws(
      () => new Some(undefined),
      'A Some monad cannot be created from undefined'
    );
  });
});

// #endregion

// #region None

describe('None Monad', () => {
  it('isSome and isNone should work correctly', () => {
    const some = new None(null);

    chai.assert.isFalse(some.isSome());
    chai.assert.isTrue(some.isNone());
  });

  it('should correctly create a None Monad from a null or undefined value', () => {
    const firstNone = new None(null);
    chai.assert.isNull(firstNone.lift());

    const secondNone = new None(undefined);
    chai.assert.isUndefined(secondNone.lift());
  });

  it("should throw if it's created from a non null value", () => {
    chai.assert.throws(
      () => new None(3),
      'A None monad cannot be created from 3'
    );
  });
});

// #endregion
