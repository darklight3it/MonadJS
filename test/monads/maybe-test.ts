import * as mocha from 'mocha';
import * as chai from 'chai';
import Maybe from '../../src/monads/maybe';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';


describe('Maybe Monad', () => {
  it('should follow the Monadic Laws', () => {
    assertMonadicLaws(Maybe);
  });
});
