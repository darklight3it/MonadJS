import * as deepEqual from 'fast-deep-equal';

const setoid = function(other: ISetoid<any>) {
  if (this === other) return true;

  return deepEqual(this, other);
};

const apply: IApply<any> = function<T,U>(afn: IMonad<((val: T) => U)>) {
  return afn.flatMap<U>(this.map.bind(this));
};

/* Option.prototype[ap] = function(a) {
  return this[chain](f => a[map](f));
}; */


const functor: IFunctor<any> = function<T,U>(fn: (val: T) => U) {
  //return this.of(fn(this.lift()));
  return this.flatMap((a:T) => this.of(fn(a)))
};
/*
Option.prototype[map] = function(f) {
  return this[chain](a => Option[of](f(a)));
};*/

const chain: IChain<any> = function<T,U>(fn: (val:T) => IMonad<U>){
  return fn(this.lift());
}

export { setoid, functor, apply, chain };
