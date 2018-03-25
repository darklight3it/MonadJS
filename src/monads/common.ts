import * as deepEqual from 'fast-deep-equal';

const setoid = function(other: ISetoid<any>) {
  if (this === other) return true;

  return deepEqual(this, other);
};

const functor: IFunctor<any> = function<T,U>(fn: (val: T) => U) {
  return this.of(fn(this.lift()));
};

const apply: IApply<any> = function<T,U>(afn: IMonad<((val: T) => U)>) {
  return this.map(afn.lift());
};

const chain: IChain<any> = function<T,U>(fn: (val:T) => IMonad<U>){
  return fn(this.lift());
}

export { setoid, functor, apply, chain };
