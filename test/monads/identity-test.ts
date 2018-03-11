import * as mocha from 'mocha';
import * as chai from 'chai';
import Identity from '../../src/monads/identity';
import assertMonadicLaws from '../assertion-utils/monadic-laws-assertions';
import asserApply from '../assertion-utils/apply-assertions';

describe('Identity Interface', () => {
  it('should follow the Monadic Laws', () => {
    assertMonadicLaws(Identity);
  });

  it('equals should work correctly', () => {
    chai.assert.isTrue(Identity.of(4).equals(4));
    chai.assert.isFalse(Identity.of(2).equals(4));
  });

  it('ap should work ', () => {
    asserApply(Identity.of(5), Identity, (val:any) => val+2);
  });
});
