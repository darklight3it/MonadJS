import * as mocha from 'mocha';
import * as chai from 'chai';
import {Identity} from '../../src/monads/identity';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';


describe('Identity Monad', () => {
  it('should follow the Monadic Laws', () => {
    assertMonadicLaws(Identity.of(3), (x: number) => x + 2, (x: number) => x * 3);
  });
});
