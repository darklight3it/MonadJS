import * as mocha from 'mocha';
import * as chai from 'chai';
import { Identity } from '../../src/monads/identity';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';

describe('Identity Monad', () => {

  const isEqual = chai.assert.equal

  const identity = Identity.of(3)

  it('should follow the Monadic Laws', () => {
    const f = (x: number) => Identity.of(x + 2);
    const g = (x: number) => Identity.of(x * 3);
    
    assertMonadicLaws(Identity,3,f,g);
  });

  it('lift should work', () => {
    isEqual(identity.lift(), 3); 
  });

  it('map should work', () => {
    isEqual(identity.map((val:number)=> val + 2).lift(), 5);
  });

  it('ap should work', () => {
    const f = (x:number) => x.toString() + 'lol';
    const afn = Identity.of(f);

    isEqual(identity.ap(afn).lift(), '3lol');
  });

  it('flatmap should work', () => {
    const f = (x:number) => Identity.of(x.toString()+'lol')
    isEqual(identity.flatMap(f).lift(), '3lol');
  });
});
