import * as mocha from 'mocha';
import * as chai from 'chai';
import { Identity } from '../../src/monads/identity';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';

describe('Identity Monad', () => {
  it('should follow the Monadic Laws', () => {
    const f = (x: number) => Identity.of(x + 2);
    const g = (x: number) => Identity.of(x * 3);
    
    assertMonadicLaws(Identity,3,f,g);
  });
});
