import * as chai from 'chai';

const equal = chai.assert.equal;

const assertApply = (monad: IMonad<any>, staticMonad: IMonadStatic, fn: (val:any)=>any) => {
  equal(monad.ap(staticMonad.of(fn)).lift(), staticMonad.of(fn(monad.lift())).lift(), 'apply method does not work')
};

export default assertApply;