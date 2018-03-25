import * as mocha from 'mocha';
import * as chai from 'chai';
import { Maybe, Some } from '../../src/monads/maybe';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';


// #region Maybe
describe('Maybe Monad', () => {
  it('should follow the Monadic Laws', () => {
    assertMonadicLaws(Maybe.of(3), (x: number) => x + 2, (x: number) => x * 3);
  });
});
// #endregion

// #region Some

describe('Some Monad', () => {

  it('should throw if it\'s created from null or undefined', ()=>{

    chai.assert.throws(()=>new Some(null),)

  });

  it('should follow the Monadic Laws', () => {
    assertMonadicLaws(Maybe.of(3), (x: number) => x + 2, (x: number) => x * 3);
  });
});

// #endregion
