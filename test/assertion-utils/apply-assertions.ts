import * as chai from 'chai';

const equal = chai.assert.equal;

const assertApply = (monad: IMonad<any>, staticMonad: IMonadStatic, fn: (val:any)=>any) => {
  equal(monad.ap(staticMonad.of(fn)).value, staticMonad.of(fn(monad.value)).value, 'apply method does not work')
};

export default assertApply;